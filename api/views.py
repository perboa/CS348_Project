from flask import jsonify, Blueprint

views = Blueprint("views", __name__, static_folder='../build', static_url_path='/')

@views.route('/')
def index():
    return views.send_static_file("index.html")

@views.route('/api/test', methods = ['GET'])
def test():
    return jsonify({"Hello":"World"})