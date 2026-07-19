#!/usr/bin/env bash
set -Eeuo pipefail

CURRENT_STEP="initializing backup job"

log() {
  printf '%s %s\n' "$(date '+%F %T')" "$*"
}

step() {
  CURRENT_STEP="$1"
  log "$CURRENT_STEP"
}

fail() {
  log "ERROR: $*"
  exit 1
}

on_error() {
  local status=$?
  local line=$1
  local command=$2

  log "ERROR: Backup failed during: $CURRENT_STEP"
  log "ERROR: Exit status $status at line $line while running: $command"
  exit "$status"
}

cleanup() {
  local status=$?

  if [ -n "${TMP_DIR:-}" ] && [ -d "$TMP_DIR" ]; then
    rm -rf "$TMP_DIR"
  fi

  if [ "$status" -ne 0 ]; then
    log "Backup job stopped with exit status $status"
  fi

  exit "$status"
}

backup_wp_content() {
  local label=$1
  local source_dir=$2
  local archive=$3
  local tar_log=$4
  local status=0

  step "Backing up $label wp-content"

  if ! [ -d "$source_dir/wp-content" ]; then
    fail "$label wp-content directory not found at $source_dir/wp-content"
  fi

  tar -czf "$archive" -C "$source_dir" wp-content >"$tar_log" 2>&1 || status=$?

  if [ -s "$tar_log" ]; then
    sed "s/^/$label tar: /" "$tar_log"
  fi

  case "$status" in
    0)
      log "$label wp-content backup completed"
      ;;
    1)
      if [ -s "$archive" ]; then
        log "WARNING: $label tar reported changed files while reading live WordPress data; archive was created and backup will continue"
      else
        fail "$label tar exited with status 1 and did not create a usable archive"
      fi
      ;;
    *)
      fail "$label tar failed with exit status $status"
      ;;
  esac
}

cleanup_old_local_archives() {
  local retention_count=7
  local backup_root=/backups

  step "Removing local backups older than the latest $retention_count files"
  mapfile -t local_backups < <(find "$backup_root" -maxdepth 1 -type f -name 'backup-*.tar.gz' | sort)
  local total_local=${#local_backups[@]}

  if [ "$total_local" -le "$retention_count" ]; then
    log "Found $total_local local backups; nothing to delete"
  else
    local delete_count=$((total_local - retention_count))
    log "Deleting $delete_count older local backups"
    for ((i=0; i<delete_count; i++)); do
      log "Deleting local backup ${local_backups[i]}"
      rm -f "${local_backups[i]}"
    done
  fi
}

cleanup_old_remote_backups() {
  local retention_count=7
  local rclone_remote=gdrive:website-backups/
  local RCLONE_LOG="$TMP_DIR/rclone-retention.log"

  step "Cleaning up remote backups older than the latest $retention_count files"
  mapfile -t remote_backups < <(rclone lsf --files-only "$rclone_remote" | grep -E '^backup-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}\.tar\.gz$' | sort)
  local total_remote=${#remote_backups[@]}

  if [ "$total_remote" -le "$retention_count" ]; then
    log "Found $total_remote remote backups; nothing to delete"
  else
    local delete_count=$((total_remote - retention_count))
    log "Deleting $delete_count older remote backups"
    for ((i=0; i<delete_count; i++)); do
      local remote_file="${rclone_remote}${remote_backups[i]}"
      log "Deleting remote backup $remote_file"
      if ! rclone deletefile "$remote_file" >"$RCLONE_LOG" 2>&1; then
        cat "$RCLONE_LOG" || true
        log "WARNING: Failed deleting remote backup $remote_file"
      fi
    done
  fi

  log "Remote backup retention cleanup completed"
}

trap 'on_error "$LINENO" "$BASH_COMMAND"' ERR
trap cleanup EXIT INT TERM HUP

log "Backup job started"

while true
do
  DATE=$(date +%F-%H-%M-%S)
  BACKUP_DIR=/backups/$DATE
  ARCHIVE=/backups/backup-$DATE.tar.gz
  TMP_DIR=$(mktemp -d /tmp/backup.XXXXXX)

  step "Starting backup cycle for $DATE"
  step "Creating backup directory $BACKUP_DIR"
  mkdir -p "$BACKUP_DIR"

  step "Backing up PostgreSQL to $BACKUP_DIR/postgres.sql.gz"
  PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
    -h postgres \
    -U "$POSTGRES_USER" \
    "$POSTGRES_DB" \
    --no-owner \
    --no-acl \
    > "$TMP_DIR/postgres.sql"
  gzip -f "$TMP_DIR/postgres.sql"
  mv "$TMP_DIR/postgres.sql.gz" "$BACKUP_DIR/postgres.sql.gz"
  log "PostgreSQL backup completed"

  step "Backing up MySQL to $BACKUP_DIR/mysql.sql.gz"
  mariadb-dump \
    -h mysql \
    -u"$MYSQL_USER" \
    -p"$MYSQL_PASSWORD" \
    --skip-ssl \
    --protocol=TCP \
    --no-tablespaces \
    --single-transaction \
    --quick \
    --all-databases \
    > "$TMP_DIR/mysql.sql"
  gzip -f "$TMP_DIR/mysql.sql"
  mv "$TMP_DIR/mysql.sql.gz" "$BACKUP_DIR/mysql.sql.gz"
  log "MySQL backup completed"

  backup_wp_content \
    "Future Star Car Hire" \
    /wordpress/futurestarcarhire \
    "$BACKUP_DIR/futurestarcarhire-wp-content.tar.gz" \
    "$TMP_DIR/futurestarcarhire-tar.log"

  backup_wp_content \
    "Future Star Car Rental" \
    /wordpress/futurestarcarrental \
    "$BACKUP_DIR/futurestarcarrental-wp-content.tar.gz" \
    "$TMP_DIR/futurestarcarrental-tar.log"

  step "Creating final archive $ARCHIVE"
  tar czf "$ARCHIVE" -C /backups "$DATE"
  log "Final archive created"

  SIZE=$(du -h "$ARCHIVE" | cut -f1)
  log "Archive size: $SIZE"

  step "Cleaning up local old archives before upload"
  cleanup_old_local_archives

  step "Uploading backup to gdrive:website-backups/"
  RCLONE_LOG="$TMP_DIR/rclone.log"
  if rclone copy "$ARCHIVE" gdrive:website-backups/ >"$RCLONE_LOG" 2>&1; then
    cat "$RCLONE_LOG"
    log "Upload completed"
  else
    cat "$RCLONE_LOG"
    log "Upload failed"
    exit 1
  fi

  step "Removing temporary backup directory $BACKUP_DIR"
  rm -rf "$BACKUP_DIR"

  step "Cleaning up remote old backups"
  cleanup_old_remote_backups

  rm -rf "$TMP_DIR"
  log "Backup cycle completed for $DATE"

  step "Sleeping for 24h before next cycle"
  sleep 24h
done
