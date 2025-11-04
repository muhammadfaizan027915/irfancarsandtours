#!/bin/sh
set -e

echo "🔍 Waiting for database to be ready..."

until pg_isready -h database -p 5432 -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" 2>/dev/null; do
  echo "⏳ Database not ready, waiting..."
  sleep 2
done

echo "✅ Database is ready!"

echo "🔄 Running database migrations..."

npm run migrate

echo "✅ Migrations completed!"

echo "🚀 Starting application..."

exec "$@"