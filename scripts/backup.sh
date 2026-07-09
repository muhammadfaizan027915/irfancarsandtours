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
  PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
    -h postgres \
    -U "$POSTGRES_USER" \
    "$POSTGRES_DB" \
    > "$TMP_DIR/postgres.sql"
  gzip -f "$TMP_DIR/postgres.sql"
  mv "$TMP_DIR/postgres.sql.gz" "$BACKUP_DIR/postgres.sql.gz"
  log "PostgreSQL backup completed"

  log "Backing up MySQL to $BACKUP_DIR/mysql.sql.gz"
  mysqldump \
    -h mysql \
    -u"$MYSQL_USER" \
    -p"$MYSQL_PASSWORD" \
    --ssl-mode=DISABLED \
    --protocol=TCP \
    --single-transaction \
    --quick \
    --all-databases \
    > "$TMP_DIR/mysql.sql"
  gzip -f "$TMP_DIR/mysql.sql"
  mv "$TMP_DIR/mysql.sql.gz" "$BACKUP_DIR/mysql.sql.gz"
  log "MySQL backup completed"

  log "Backing up Future Star Car Hire files"
  tar --warning=no-file-changed \
    -czf "$BACKUP_DIR/futurestarcarhire.tar.gz" \
    -C /wordpress futurestarcarhire
  log "Future Star Car Hire files backup completed"

  log "Backing up Future Star Car Rental files"
  tar --warning=no-file-changed \
    -czf "$BACKUP_DIR/futurestarcarrental.tar.gz" \
    -C /wordpress futurestarcarrental
  log "Future Star Car Rental files backup completed"

  log "Creating final archive $ARCHIVE"
  tar czf "$ARCHIVE" -C /backups "$DATE"
  log "Final archive created"

  SIZE=$(du -h "$ARCHIVE" | cut -f1)
  log "Archive size: $SIZE"

  log "Uploading backup to remote:website-backups/"
  rclone copy "$ARCHIVE" remote:website-backups/
  log "Upload completed"

  log "Sending email notification to $BACKUP_EMAIL"
  printf '%s\n\n%s\n%s\n%s\n' \
    "Daily backup completed." \
    "File: backup-$DATE.tar.gz" \
    "Size: $SIZE" \
    "Location: remote:website-backups/backup-$DATE.tar.gz" \
    | mutt -s 'Daily Website Backup Completed' -- "$BACKUP_EMAIL"
  log "Email notification sent"

  log "Removing temporary backup directory $BACKUP_DIR"
  rm -rf "$BACKUP_DIR"

  log "Cleaning up old archives"
  find /backups -name '*.tar.gz' -mtime +7 -delete
  rm -rf "$TMP_DIR"
  log "Backup cycle completed for $DATE"

  log "Sleeping for 86400 seconds before next cycle"
  sleep 86400
done
