from flask import jsonify, Blueprint, Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from models import User, College, Review, Attended, Program, Rating, DegreeType
from api import db
from signup import SignupForm
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
        'name': result.name,
        'city': result.city,
        'state': result.state_province,
        'country': result.country,
        'logo_URL': result.logo_URL
    })


@views.route('/colleges/summary', methods=['GET'])
def getCollegeSummary():
    args = request.args
    id = args['ID']
    rating = Review.query.with_entities(func.avg(Review.recommend).label('average')).filter(Review.college_id==id).one()[0]
    student_life = Review.query.with_entities(func.avg(Review.student_life).label('average')).filter(Review.college_id==id).one()[0]
    academics = Review.query.with_entities(func.avg(Review.academics).label('average')).filter(Review.college_id==id).one()[0]
    reputation = Review.query.with_entities(func.avg(Review.employer_reputation).label('average')).filter(Review.college_id==id).one()[0]
    difficulty = Review.query.with_entities(func.avg(Review.difficulty).label('average')).filter(Review.college_id==id).one()[0]

    return jsonify({
        'rating': rating,
        'student_life': student_life,
        'difficulty': difficulty,
        'academics': academics,
        'reputation': reputation
    })

@views.route('/colleges/reviews/all_ids', methods=['GET'])
def getAllCollegeReviews():
    args = request.args
    id = args['ID']
    stmt = db.select(Review.user_id).where(College.id == id)
    results = db.session.execute(stmt).all()

    reviews = []

    for review in results:
        reviews.append(review[0])

    return jsonify({
        'reviews': reviews
    })

@views.route('/review', methods=['GET'])
def getReview():
    args = request.args
    u_id = args['user_id']
    c_id = args['college_id']
    print(u_id, c_id)
    review = Review.query.filter(Review.user_id == u_id, Review.college_id == c_id).one()
    user = User.query.filter(User.id == u_id).one()

    return jsonify({
        'body': review.body,
        'recommend': review.recommend,
        'difficulty': review.difficulty.value,
        'student_life': review.student_life.value,
        'academics': review.academics.value,
        'employer_reputation': review.employer_reputation.value,
        'username' : user.first_name
    })

@views.route('/login', methods = ['GET', 'POST'])
def login():
    uemail = request.json.get("email", None)
    password = request.json.get("password", None)
    stmt = db.select(User).where(User.email == uemail)
    result = db.session.execute(stmt).scalar()
    print("here")
    print(result)
    responselist =[]
    if result == None:
        responselist.append("False")
        return responselist
    else: 
        actpassword = result.password
        id = result.id
        print(id)
        if actpassword == password:
            responselist.append("True")
            responselist.append(id)
            return responselist
        else: responselist.append("False")
        return responselist

@views.route('/signup', methods = ['GET', 'POST'])
def signup(): 
    uemail = request.json.get("email", None)
    upassword = request.json.get("password", None)
    ufirstname = request.json.get("firstName", None)
    ulastname = request.json.get("lastName", None)
    stmt = db.insert(User).values(first_name=ufirstname, last_name=ulastname, email=uemail,password=upassword)
    result = db.session.execute(stmt)
    print(result.inserted_primary_key)
    db.session.commit()
    if result == None:
        return "False"
    else: return "True"

