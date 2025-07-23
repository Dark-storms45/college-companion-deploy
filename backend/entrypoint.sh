#!/bin/sh

set -e

echo "🔄 Running migrations..."
python /app/manage.py makemigrations --noinput
python /app/manage.py migrate --noinput
python manage.py migrate api 0001 --fake

echo "📦 Collecting static files..."
python /app/manage.py collectstatic --noinput

echo "👤 Creating superuser (email-based)..."
python /app/manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
email = "${DJANGO_SUPERUSER_EMAIL}"
password = "${DJANGO_SUPERUSER_PASSWORD}"
if email and password and not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password)
END

echo "🚀 Starting Gunicorn..."
gunicorn backend.wsgi:application --chdir /app --bind 0.0.0.0:8000 --workers 3 &



    wait
echo "✅ All services started successfully."