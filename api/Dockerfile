FROM python:3.9
WORKDIR /app

COPY requirements.txt api.py views.py models.py .flaskenv ./
RUN pip install -r ./requirements.txt

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "api:app"]