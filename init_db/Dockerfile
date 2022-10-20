FROM python:3.9
WORKDIR /app

COPY requirements.txt api.py models.py .flaskenv ./
COPY colleges.csv surnames.csv first_names.csv programs.csv ./
RUN pip install -r ./requirements.txt

EXPOSE 5001
CMD ["gunicorn", "-b", ":5001", "api:app"]