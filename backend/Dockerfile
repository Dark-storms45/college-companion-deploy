FROM python:3.11-slim

RUN apt-get update && apt-get install -y gcc libpq-dev

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project and manage.py
COPY backend/ /app/backend/
# ...existing code...
COPY backend/backend/firebase-service-account.json /app/backend/firebase-service-account.json
# ...existing code...
COPY manage.py /app/manage.py

# Copy entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]