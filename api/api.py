from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from views import views

app = Flask(__name__, static_folder='../build', static_url_path='/')

app.register_blueprint(views)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User

with app.app_context():
    db.create_all()