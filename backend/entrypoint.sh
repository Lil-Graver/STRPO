#!/bin/sh

# Небольшая задержка, чтобы PostgreSQL успел подняться
echo "🕒 Waiting for DB to be ready..."
sleep 5

echo "⚙️ Applying migrations..."
python manage.py migrate

echo "🚀 Starting Django development server..."
python manage.py runserver 0.0.0.0:8000