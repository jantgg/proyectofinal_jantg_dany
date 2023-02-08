"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Photographer, Photo, Route, Favorite, Bike
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sync', methods=['GET'])
@jwt_required()
def sync_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    photographer = Photographer.query.filter_by(email=email).first()
    if not user and not photographer:
        return jsonify ({"type": None}), 401
    if user: return jsonify({"type": "user"}), 200
    if photographer: return jsonify({"type": "photographer"}), 200


  



@api.route('/login', methods=['POST'])
def user_login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user = User.query.filter_by(email=body_email, password = body_password).first()
    photographer = Photographer.query.filter_by(email= body_email, password = body_password).first()
    if not user and not photographer:
        return jsonify ({"error":"X"}), 401
    token = None
    if user: token = create_access_token(identity=user.email) 
    if photographer: token = create_access_token(identity=photographer.email) 
   
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    print(user)
    return jsonify({"response": "hola", "token": token }), 200










@api.route('/loginp', methods=['POST'])
def photographer_login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    photographer = Photographer.query.filter_by(email= body_email, password = body_password).first()
    if not user or photographer:
        return jsonify ({"error":"X"}), 401
    token = create_access_token(identity=photographer.id)
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    print(photographer)
    return jsonify({"response": "hola", "token": token }), 200




@api.route('/register', methods=['POST'])
def user_register():
    body_user_name = request.json.get("user_name")
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user_already_exist = User.query.filter_by(email= body_email).first()
    photographer_already_exist = Photographer.query.filter_by(email= body_email).first()
    if user_already_exist or photographer_already_exist:
        return jsonify({"response": "Email already used"}), 300
    new_user = User(email=body_email, password=body_password, user_name=body_user_name, active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"response": "User registered successfully",}), 200

@api.route('/bpr', methods=['POST'])
def photographer_register():
    body_user_name = request.json.get("user_name")
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    body_location_text = request.json.get("location")
    body_instagram = request.json.get("instagram")
    body_sunday = request.json.get("sunday")
    body_service = request.json.get("service")
    user_already_exist = User.query.filter_by(email= body_email).first()
    photographer_already_exist = Photographer.query.filter_by(email= body_email).first()
    if user_already_exist or photographer_already_exist:
        return jsonify({"response": "Email already used"}), 300
    new_photographer = Photographer(email=body_email, password=body_password, user_name=body_user_name, location_text=body_location_text, instagram=body_instagram, services_text=body_service, find_me_text=body_sunday, active=True)
    db.session.add(new_photographer)
    db.session.commit()
    return jsonify({"response": "Photographer registered successfully",}), 200

#Endpoints iniciales de creacion de DB
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users_serialized = [x.serialize() for x in users]
    return jsonify({"body": users_serialized}), 200

@api.route('/photographers', methods=['GET'])
def get_all_photographers():
    photographers = Photographer.query.all()
    photographers_serialized = [x.serialize() for x in photographers]
    return jsonify({"body": photographers_serialized}), 200

@api.route('/bikes', methods=['GET'])
def get_all_bikes():
    bikes = Bike.query.all()
    bikes_serialized = [x.serialize() for x in bikes]
    return jsonify({"body": bikes_serialized}), 200


@api.route('/routes', methods=['GET'])
def get_all_routes():
    routes = Route.query.all()
    routes_serialized = [x.serialize() for x in routes]
    return jsonify({"body": routes_serialized}), 200

@api.route('/photos', methods=['GET'])
def get_all_photos():
    photos = Photo.query.all()
    photos_serialized = [x.serialize() for x in photos]
    return jsonify({"body": photos_serialized}), 200

@api.route('/userbikes', methods=['GET'])
def get_all_userbikes():
    userbikes = Userbike.query.all()
    userbikes_serialized = [x.serialize() for x in userbikes]
    return jsonify({"body": userbikes_serialized}), 200
