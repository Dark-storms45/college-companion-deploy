#!/bin/sh

python manage.py migrate
python manage.py createsuperuser --noinput || true

gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3 &

celery -A backend worker --loglevel=INFO &

wait