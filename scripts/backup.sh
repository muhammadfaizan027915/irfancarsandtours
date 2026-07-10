#!/bin/sh
set -eu

log() {
  printf '%s %s\n' "$(date '+%F %T')" "$*"
}

cleanup() {
  if [ -n "${TMP_DIR:-}" ] && [ -d "$TMP_DIR" ]; then
    rm -rf "$TMP_DIR"
  fi
}

trap cleanup EXIT INT TERM HUP

log "Backup job started"

while true
do
  DATE=$(date +%F-%H-%M)
  BACKUP_DIR=/backups/$DATE
  ARCHIVE=/backups/backup-$DATE.tar.gz
  TMP_DIR=$(mktemp -d /tmp/backup.XXXXXX)

  log "Starting backup cycle for $DATE"
  log "Creating backup directory $BACKUP_DIR"
  mkdir -p "$BACKUP_DIR"

  log "Backing up PostgreSQL to $BACKUP_DIR/postgres.sql.gz"
  log "Target database: $POSTGRES_USER@postgres/$POSTGRES_DB"
  PGPASSWORD="$POSTGRES_PASSWORD" psql \
    -h postgres \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB" \
    -Atqc "select count(*) from pg_catalog.pg_tables where schemaname not in ('pg_catalog', 'information_schema');" \
    > "$TMP_DIR/postgres.table_count"
  TABLE_COUNT=$(cat "$TMP_DIR/postgres.table_count")
  log "Visible user tables: $TABLE_COUNT"

  PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
    -h postgres \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB" \
    --no-owner \
    --no-acl \
    --verbose \
    > "$TMP_DIR/postgres.sql" 2>"$TMP_DIR/postgres.dump.log"
  if [ ! -s "$TMP_DIR/postgres.sql" ]; then
    cat "$TMP_DIR/postgres.dump.log"
    log "PostgreSQL dump is empty"
    exit 1
  fi
  cat "$TMP_DIR/postgres.dump.log"
  gzip -f "$TMP_DIR/postgres.sql"
  mv "$TMP_DIR/postgres.sql.gz" "$BACKUP_DIR/postgres.sql.gz"
  log "PostgreSQL backup completed"

  log "Backing up MySQL to $BACKUP_DIR/mysql.sql.gz"
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

  log "Backing up Future Star Car Hire wp-content"
  tar --warning=no-file-changed \
    -czf "$BACKUP_DIR/futurestarcarhire-wp-content.tar.gz" \
    -C /wordpress/futurestarcarhire wp-content
  log "Future Star Car Hire wp-content backup completed"

  log "Backing up Future Star Car Rental wp-content"
  tar --warning=no-file-changed \
    -czf "$BACKUP_DIR/futurestarcarrental-wp-content.tar.gz" \
    -C /wordpress/futurestarcarrental wp-content
  log "Future Star Car Rental wp-content backup completed"

  log "Creating final archive $ARCHIVE"
  tar czf "$ARCHIVE" -C /backups "$DATE"
  log "Final archive created"

  SIZE=$(du -h "$ARCHIVE" | cut -f1)
  log "Archive size: $SIZE"

  log "Uploading backup to gdrive:website-backups/"
  RCLONE_LOG="$TMP_DIR/rclone.log"
  if rclone copy "$ARCHIVE" gdrive:website-backups/ >"$RCLONE_LOG" 2>&1; then
    cat "$RCLONE_LOG"
    log "Upload completed"
  else
    cat "$RCLONE_LOG"
    log "Upload failed"
    exit 1
  fi

  log "Removing temporary backup directory $BACKUP_DIR"
  rm -rf "$BACKUP_DIR"

  log "Cleaning up old archives"
  find /backups -name '*.tar.gz' -mtime +7 -delete
  rm -rf "$TMP_DIR"
  log "Backup cycle completed for $DATE"

  log "Sleeping for 24h before next cycle"
  sleep 24h
done
