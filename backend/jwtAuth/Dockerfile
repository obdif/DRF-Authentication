FROM python:3.9-slim

ENV PYTHONANDBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN apt-get update \
    && apt-get install -y default-mysql-client pkg-config libmariadb-dev-compat libmariadb-dev \
    && pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . .


EXPOSE 8000


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]