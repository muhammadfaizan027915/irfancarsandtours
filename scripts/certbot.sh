#!/bin/sh
set -eu

log() {
  printf '%s %s\n' "$(date '+%F %T')" "$*"
}

log "Certbot job started"

log "Requesting certificate for irfancarsandtours domains"
certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --non-interactive \
  --agree-tos \
  --expand \
  --email "$CERT_EMAIL" \
  -d "$CERT_DOMAIN_IRFAN_CARS_AND_TOURS" \
  -d "$CERT_DOMAIN_IRFAN_CARS_AND_TOURS_WWW"
log "Certificate request completed for irfancarsandtours"

log "Requesting certificate for futurestarcarhire domains"
certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --non-interactive \
  --agree-tos \
  --expand \
  --email "$CERT_EMAIL" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_HIRE" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_HIRE_WWW"
log "Certificate request completed for futurestarcarhire"

log "Requesting certificate for futurestarcarrental domains"
certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --non-interactive \
  --agree-tos \
  --expand \
  --email "$CERT_EMAIL" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_RENTAL" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_RENTAL_WWW"
log "Certificate request completed for futurestarcarrental"

while true
do
  log "Starting certificate renewal check"
  certbot renew \
    --webroot \
    --webroot-path=/var/www/certbot
  log "Certificate renewal check completed"

  log "Sleeping for 12 hours before next renewal check"
  sleep 12h
done
