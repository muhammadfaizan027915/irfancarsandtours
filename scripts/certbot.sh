#!/bin/sh
set -eu

certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --non-interactive \
  --agree-tos \
  --expand \
  --email "$CERT_EMAIL" \
  -d "$CERT_DOMAIN_IRFAN_CARS_AND_TOURS" \
  -d "$CERT_DOMAIN_IRFAN_CARS_AND_TOURS_WWW"

certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --non-interactive \
  --agree-tos \
  --expand \
  --email "$CERT_EMAIL" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_HIRE" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_HIRE_WWW"

certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --non-interactive \
  --agree-tos \
  --expand \
  --email "$CERT_EMAIL" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_RENTAL" \
  -d "$CERT_DOMAIN_FUTURE_STAR_CAR_RENTAL_WWW"

while true
do
  certbot renew \
    --webroot \
    --webroot-path=/var/www/certbot

  sleep 12h
done
