#!/bin/sh

python /app/manage.py migrate
python /app/manage.py createsuperuser --noinput || true

gunicorn backend.wsgi:application --chdir /app --bind 0.0.0.0:8000 --workers 3 &

celery -A backend worker --workdir=/app --loglevel=INFO &

wait