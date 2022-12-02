from flask import jsonify, Blueprint, Flask
from flask import request, redirect
from flask_sqlalchemy import SQLAlchemy
from models import User, College, Review, Attended, Program
from api import db
# from signup import SignupForm

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

@views.route('/login', methods = ['GET', 'POST'])
def login():
    uemail = request.json.get("email", None)
    password = request.json.get("password", None)
    stmt = db.select(User).where(User.email == uemail)
    result = db.session.execute(stmt).scalar()
    print("here")
    print(result)
    if result == None:
        return "False"
    else: 
        actpassword = result.password
        if actpassword == password:
            return "True"
        else: return "False"
    #return jsonify ({
    #    'email': result.email,
    #    'password': result.password
    #}
#)

@views.route('/signup', methods = ['GET', 'POST'])
def signup(): 
    fname = request.json.get("firstName", None)
    lname = request.json.get("lastName", None)
    given_email = request.json.get("email", None)
    given_password = request.json.get("password", None)
    user = User(first_name=fname, last_name=lname, email=given_email)
    user.set_password(given_password)
    search = db.select(User).where(User.email == given_email)
    result = db.session.execute(search).scalar()
    if result == None:
        db.session.add(user)
        db.session.commit()
        return "True"
    else:
        return "False"
