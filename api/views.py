from flask import jsonify, Blueprint, Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from models import User, College, Review, Attended, Program
from api import db

views = Blueprint("views", __name__, static_folder='../build', static_url_path='/')

@views.route('/')
def index():
    return views.send_static_file("index.html")

@views.route('/api/test', methods = ['GET'])
def test():
    return jsonify({"Hello":"World"})

@views.route('/colleges/base-info/<id>', methods=['GET'])
def getCollegeBase(id):
    stmt = db.select(College).where(College.id == id)
    result = db.session.execute(stmt).one()[0]

    return jsonify({
        'name': result.name,
        'city': result.city,
        'state': result.state_province,
        'country': result.country,
        'logo_URL': result.logo_URL
    })

    