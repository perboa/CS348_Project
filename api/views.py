from flask import jsonify, Blueprint, Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from models import User, College, Review, Attended, Program
from api import db
#from signup import SignupForm
from sqlalchemy import func

views = Blueprint("views", __name__, static_folder='../build', static_url_path='/')

@views.route('/')
def index():
    return views.send_static_file("index.html")

@views.route('/api/test', methods = ['GET'])
def test():
    return jsonify({"Hello":"World"})

@views.route('/colleges/base-info', methods=['GET'])
def getCollegeBase():
    id = request.args['ID']
    stmt = db.select(College).where(College.id == id)
    result = db.session.execute(stmt).one()[0]

    return jsonify({
        'id': result.id,
        'name': result.name,
        'city': result.city,
        'state': result.state_province,
        'country': result.country,
        'logo_url': result.logo_URL
    })


@views.route('/colleges/summary', methods=['GET'])
def getCollegeSummary():
    args = request.args
    stmt = db.select().where(College.id == id)
    # need to finish this
    # db.session.query(func.avg(Review.).label('average')).filter(Rating.url==url_string.netloc)

    return jsonify({
        'rating': result.name,
        'student_life': result.city,
        'difficulty': result.state_province,
        'academics': result.country,
        'reputation': result.logo_URL
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
'''
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

'''