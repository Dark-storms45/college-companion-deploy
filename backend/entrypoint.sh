#!/bin/sh

set -e

# Define a helper for colored output
green()  { echo "\033[0;32m$1\033[0m"; }
blue()   { echo "\033[0;34m$1\033[0m"; }
yellow() { echo "\033[1;33m$1\033[0m"; }

green "🔄 Checking for migrations..."
python /app/manage.py makemigrations --check || {
    yellow "🌀 New migrations detected. Creating..."
    python /app/manage.py makemigrations
}

green "🛠️ Applying migrations..."
python /app/manage.py migrate --noinput
python /app/manage.py migrate api 0001 --fake

blue "📦 Collecting static files..."
python /app/manage.py collectstatic --noinput

green "👤 Creating superuser..."
python /app/manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
email = "${DJANGO_SUPERUSER_EMAIL}"
password = "${DJANGO_SUPERUSER_PASSWORD}"
if email and password and not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password)
END

blue "🚀 Starting Gunicorn..."
gunicorn backend.wsgi:application --chdir /app --bind 0.0.0.0:$PORT --workers 3 &

wait
green "✅ All services started successfully!"
