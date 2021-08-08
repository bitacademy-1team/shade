FROM python:3.8.10 as builder

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8000

CMD ["gunicorn","mysite.wsgi:application","--bind","0.0.0.0:8000"]

