"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Photographer, Photo, Route, Favorite, Bike, Question, Answer
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# LOGIN DE USER --------------------------------------------------------------------------------------->
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
    return jsonify({"response": "hola", "token": token }), 200

# REGISTRO DE USER ------------------------------------------------------------------------------------->
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

# REGISTRO DE FOTOGRAFO ------------------------------------------------------------------------------->
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

# REVISAR TIPO DE USER/FOTOGRAFO ----------------------------------------------------------------------->
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

@api.route('/questions', methods=['GET'])
def get_all_questions():
    questions = Question.query.all()
    questions_serialized = [x.serialize() for x in questions]
    return jsonify({"body": questions_serialized}), 200


@api.route('/answers', methods=['GET'])
def get_all_answers():
    answers = Answer.query.all()
    answers_serialized = [x.serialize() for x in answers]
    return jsonify({"body": answers_serialized}), 200



@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    favorites = Favorite.query.filter_by(user_id=user.id).all()
    favorites_data = []
    for favorite in favorites:
        favorites_data.append({
            'id': favorite.id,
            'bike': favorite.bike.name,
            'route': favorite.route.name,
            'photographer': favorite.photographer.name
            })
    return jsonify({'favorites': favorites_data}), 200


@api.route('/favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    favorite_type = request.json.get('favorite_type')
    favorite_id = request.json.get('favorite_id')
    if not favorite_type or not favorite_id:
        return jsonify({'error': 'Favorite type or ID not provided'}), 400
    favorite_obj = None
    if favorite_type == 'bike':
        bike = Bike.query.get(favorite_id)
        if not bike:
            return jsonify({'error': 'Bike not found'}), 404
        favorite_obj = Favorite(user_id=user.id, bike_id=bike.id)
    elif favorite_type == 'route':
        route = Route.query.get(favorite_id)
        if not route:
            return jsonify({'error': 'Route not found'}), 404
        favorite_obj = Favorite(user_id=user.id, route_id=route.id)
    elif favorite_type == 'photographer':
        photographer = Photographer.query.get(favorite_id)
        if not photographer:
            return jsonify({'error': 'Photographer not found'}), 404
        favorite_obj = Favorite(user_id=user.id, photographer_id=photographer.id)
    if not favorite_obj:
        return jsonify({'error': 'Invalid favorite type'}), 400
    db.session.add(favorite_obj)
    db.session.commit()

    return jsonify({'message': f'{favorite_type.capitalize()} added to favorites'}), 201
