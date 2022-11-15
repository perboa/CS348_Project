from flask import jsonify, Blueprint, Flask
from flask import request
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
#from models import User



views = Blueprint("views", __name__, static_folder='../build', static_url_path='/')

@views.route('/')
def index():
    return views.send_static_file("index.html")

@views.route('/api/test', methods = ['GET'])
def test():
    return jsonify({"Hello":"World"})

# WIP still need to figure out db 
@views.route('/api/login', methods = ['POST'])
def login():
    #print(request)
    #sentemail = request.json['email']
    #sentpassword = request.json['password']
    #user = db.User.query.filter_by(email=sentemail).first()
    #actualpassword = user.password
    #if user is None:
    #    return jsonify({"msg": "Bad email"}), 401
    #elif actualpassword != sentpassword:
    #   return jsonify({"msg": "Bad password"}), 401
    #access_token = create_access_token(identity=email)
    #else:
    #    return jsonify({"msg": "Success"})
