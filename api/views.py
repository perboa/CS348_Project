from flask import jsonify, Blueprint, Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from models import User, College, Review, Attended, Program
from api import db
from signup import SignupForm

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

@views.route('/login', methods = ['GET'])
def login(data):
    stmt = db.select(User).where(User.email == data.email)
    result = db.session.execute(stmt).one()[0]

    return jsonify ({
        'email': result.email,
        'password': result.password
    }
)

 @views.route('/api/signup', methods = ['GET', 'POST'])
 def signup(): 
    form = SignupForm()
    if form.validate_on_submit():
        user = User(first_name=form.first_name.data, last_name=form.last_name.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect('/')
    return render_template('signup.html', form=form)

