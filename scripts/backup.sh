#!/bin/sh
set -eu

while true
do
  DATE=$(date +%F-%H-%M)
  BACKUP_DIR=/backups/$DATE
  ARCHIVE=/backups/backup-$DATE.tar.gz

  mkdir -p "$BACKUP_DIR"

  echo 'Backing up PostgreSQL...'
  PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
    -h postgres \
    -U "$POSTGRES_USER" \
    "$POSTGRES_DB" \
    | gzip > "$BACKUP_DIR/postgres.sql.gz"

  echo 'Backing up MySQL...'
  mysqldump \
    -h mysql \
    -u"$MYSQL_USER" \
    -p"$MYSQL_PASSWORD" \
    --single-transaction \
    --quick \
    --all-databases \
    | gzip > "$BACKUP_DIR/mysql.sql.gz"

  echo 'Backing up WordPress files...'
  tar czf "$BACKUP_DIR/futurestarcarhire.tar.gz" \
    -C /wordpress futurestarcarhire

  tar czf "$BACKUP_DIR/futurestarcarrental.tar.gz" \
    -C /wordpress futurestarcarrental

  echo 'Creating final archive...'
  tar czf "$ARCHIVE" -C /backups "$DATE"

  SIZE=$(du -h "$ARCHIVE" | cut -f1)

  echo 'Uploading backup...'
  rclone copy "$ARCHIVE" remote:website-backups/

  echo 'Sending email notification...'
  printf '%s\n\n%s\n%s\n%s\n' \
    "Daily backup completed." \
    "File: backup-$DATE.tar.gz" \
    "Size: $SIZE" \
    "Location: remote:website-backups/backup-$DATE.tar.gz" \
    | mutt -s 'Daily Website Backup Completed' -- "$BACKUP_EMAIL"

  rm -rf "$BACKUP_DIR"

  find /backups -name '*.tar.gz' -mtime +7 -delete
  sleep 86400
done
