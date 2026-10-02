#!/bin/sh
set -u

log() {
  printf '%s %s\n' "$(date '+%F %T')" "$*"
}

# Request a cert only if one doesn't already exist
request_cert() {
  name="$1"; d1="$2"; d2="$3"

  if [ -f "/etc/letsencrypt/live/$d1/fullchain.pem" ]; then
    log "Certificate for $name already exists, skipping initial request"
    return 0
  fi

  log "Requesting certificate for $name"
  if certbot certonly \
      --webroot \
      --webroot-path=/var/www/certbot \
      --non-interactive \
      --agree-tos \
      --email "$CERT_EMAIL" \
      -d "$d1" -d "$d2"; then
    log "Certificate request completed for $name"
  else
    log "Certificate request FAILED for $name (continuing)"
  fi
}

log "Certbot job started"

request_cert irfancarsandtours \
  "$CERT_DOMAIN_IRFAN_CARS_AND_TOURS" "$CERT_DOMAIN_IRFAN_CARS_AND_TOURS_WWW"
request_cert futurestarcarhire \
  "$CERT_DOMAIN_FUTURE_STAR_CAR_HIRE" "$CERT_DOMAIN_FUTURE_STAR_CAR_HIRE_WWW"
request_cert futurestarcarrental \
  "$CERT_DOMAIN_FUTURE_STAR_CAR_RENTAL" "$CERT_DOMAIN_FUTURE_STAR_CAR_RENTAL_WWW"

while true; do
  log "Starting certificate renewal check"
  certbot renew --webroot --webroot-path=/var/www/certbot \
    || log "Renewal check failed (will retry next cycle)"
  log "Sleeping for 12 hours"
  sleep 12h
done