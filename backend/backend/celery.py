import os
import ssl
from urllib.parse import urlparse
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')

# Apply SSL settings only if using rediss://
redis_url = os.getenv('REDIS_URL', '')
if urlparse(redis_url).scheme == 'rediss':
    ssl_options = {"ssl_cert_reqs": ssl.CERT_NONE}  # Use ssl.CERT_REQUIRED in production
    app.conf.broker_use_ssl = ssl_options
    app.conf.redis_backend_use_ssl = ssl_options

app.autodiscover_tasks()
