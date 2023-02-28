"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import re
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Photographer, Photo, Route, Favorite, Bike, Question, Answer
from api.utils import generate_sitemap, APIException
from werkzeug.security import (generate_password_hash, check_password_hash)
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# LOGIN DE USER --------------------------------------------------------------------------------------------------------->

@api.route('/login', methods=['POST'])
def user_login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user = User.query.filter_by(email=body_email).first()
    photographer = Photographer.query.filter_by(email=body_email).first()
    token = None
    if not user and not photographer:
        return jsonify ({"error": "This user or photographer does not exist"}), 401
    if user and check_password_hash(user.password, body_password):
        token = create_access_token(identity=user.email) 
    elif photographer and check_password_hash(photographer.password, body_password):
        token = create_access_token(identity=photographer.email) 
    else:
        return jsonify({"error": "The entered password is incorrect."}), 401
    return jsonify({"token": token}), 200


# REGISTRO DE USER ------------------------------------------------------------------------------------------------------>

@api.route('/register', methods=['POST'])
def user_register():
    body_user_name = request.json.get("user_name")
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    body_confirmpassword = request.json.get("confirmpassword")
    user_already_exist = User.query.filter_by(email= body_email).first()
    user_name_already_exist = User.query.filter_by(user_name= body_user_name).first()
    photographer_already_exist = Photographer.query.filter_by(email= body_email).first()
    photographer_user_name_already_exist = Photographer.query.filter_by(user_name= body_user_name).first()
    if user_already_exist or photographer_already_exist:
        return jsonify({"response": "The indicated email is already being used by another user or photographer"}), 409
    if user_name_already_exist or photographer_user_name_already_exist:
        return jsonify({"response": "The indicated username is already being used by another user or photographer"}), 422
    if body_password != body_confirmpassword:
        return jsonify({"response": "The entered password is different, please check the password"}), 422
    def generate_hashed_password(password):
        if not password:
            raise AssertionError('No password provided')
        if not re.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$', password):
            raise AssertionError('The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        if len(password) < 8 or len(password) > 50:
            raise AssertionError('Password must contain between 8 and 50 characters')
        return generate_password_hash(password)
    hashed_password = generate_hashed_password(body_password)
    new_user = User(email=body_email, password=hashed_password, user_name=body_user_name, active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"response": "User registered successfully!"}), 200


# REGISTRO DE FOTOGRAFO ------------------------------------------------------------------------------------------------->

@api.route('/photographerregister', methods=['POST'])
def photographer_register():
    body_user_name = request.json.get("user_name")
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    body_confirmpassword = request.json.get("confirmpassword")
    body_location_text = request.json.get("location")
    body_instagram = request.json.get("instagram")
    body_sunday = request.json.get("sunday")
    body_service = request.json.get("service")
    user_already_exist = User.query.filter_by(email= body_email).first()
    user_name_already_exist = User.query.filter_by(user_name= body_user_name).first()
    photographer_already_exist = Photographer.query.filter_by(email= body_email).first()
    photographer_user_name_already_exist = Photographer.query.filter_by(user_name= body_user_name).first()
    if user_already_exist or photographer_already_exist:
        return jsonify({"response": "The indicated email is already being used by another user or photographer"}), 409
    if user_name_already_exist or photographer_user_name_already_exist:
        return jsonify({"response": "The indicated username is already being used by another user or photographer"}), 422
    if body_password != body_confirmpassword:
        return jsonify({"response": "The entered password is different, please check the password"}), 422
    def generate_hashed_password(password):
        if not password:
            raise AssertionError('No password provided')
        if not re.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$', password):
            raise AssertionError('The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        if len(password) < 8 or len(password) > 50:
            raise AssertionError('Password must contain between 8 and 50 characters')
        return generate_password_hash(password)
    hashed_password = generate_hashed_password(body_password)
    new_photographer = Photographer(email=body_email, password=hashed_password, user_name=body_user_name, location_text=body_location_text, instagram=body_instagram, services_text=body_service, find_me_text=body_sunday, active=True)
    db.session.add(new_photographer)
    db.session.commit()
    return jsonify({"response": "Photographer registered successfully!",}), 200



# REVISAR TIPO DE USER/FOTOGRAFO ----------------------------------------------------------------------------------------->
@api.route('/sync', methods=['GET'])
@jwt_required()
def sync_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    photographer = Photographer.query.filter_by(email=email).first()
    if not user and not photographer:
        return jsonify ({"type": None}), 401

    if user: return jsonify({"type": "User"}), 200
    if photographer: return jsonify({"type": "Photographer"}), 200

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

@api.route('/photos', methods=['GET'])
def get_all_photos():
    photos = Photo.query.all()
    photos_serialized = [x.serialize() for x in photos]
    return jsonify({"body": photos_serialized}), 200
    
# GET DE PREGUNTAS ------------------------------------------------------------------------------------------------------->
@api.route('/questions', methods=['GET'])
def get_all_questions():
    questions = Question.query.all()
    questions_serialized = [x.serialize() for x in questions]
    return jsonify({"body": questions_serialized}), 200

# GET DE RESPUESTAS ------------------------------------------------------------------------------------------------------>
@api.route('/answers', methods=['GET'])
def get_all_answers():
    answers = Answer.query.all()
    answers_serialized = [x.serialize() for x in answers]
    return jsonify({"body": answers_serialized}), 200

# GET DE RUTAS ----------------------------------------------------------------------------------------------------------->
@api.route('/routes', methods=['GET'])
def get_all_routes():
    routes = Route.query.all()
    routes_serialized = [x.serialize() for x in routes]
    return jsonify({"body": routes_serialized}), 200

# GET DE FAVORITOS ------------------------------------------------------------------------------------------------------->
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    favorites = Favorite.query.filter(Favorite.user_id == user.id).all()
    favorites_data = []
    for favorite in favorites:
        favorite_data = {}
        if favorite.bike is not None:
            favorite_data['bike'] = favorite.bike.serialize()
        if favorite.route is not None:
            favorite_data['route'] = favorite.route.serialize()
        if favorite.photographer is not None:
            favorite_data['photographer'] = favorite.photographer.serialize()
        favorites_data.append(favorite_data)
    return jsonify({'body': favorites_data}), 200

# POST DE FAVORITOS ----------------------------------------------------------------------------------------------------->
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

# FILTRO DE MOTOS -------------------------------------------------------------------
@api.route('/answers', methods=['POST'])
def create_suggestion():
    answers = request.get_json()
    queries = []
    for answer in answers:
        if answer["current_question_id"] == "q1":
            queries.append(Bike.ask_1_license == answer["id"])
        elif answer["current_question_id"] == "q2":
            queries.append(Bike.ask_2_wheels == answer["id"])
        elif answer["current_question_id"] == "q3":
            queries.append(Bike.ask_3_surface == answer["id"])
        elif answer["current_question_id"] == "q4":
            queries.append(Bike.ask_4_comodity == answer["id"])
    suggestion = Bike.query.filter(*queries).all()
    return jsonify({"result": [x.serialize() for x in suggestion]}), 201

#Endpoints para INSOMNIA
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

@api.route('/routes', methods=['POST'])
def create_route():
    data = request.get_json()
    new_routes = []
    for route_data in data:
        new_route = Route(
            name=route_data['name'],
            start_location_text=route_data['start_location_text'],
            end_location_text=route_data['end_location_text'],
            interest_text=route_data['interest_text'],
            start_location_name=route_data['start_location_name'],
            start_latitude=route_data['start_latitude'],
            start_longitude=route_data['start_longitude'],
            end_location_name=route_data['end_location_name'],
            end_latitude=route_data['end_latitude'],
            end_longitude=route_data['end_longitude']
        )
        db.session.add(new_route)
        new_routes.append(new_route)
    db.session.commit()
    return jsonify({"response": "Route send successfully",}), 200

@api.route('/bikes', methods=['POST'])
def create_bikes():
    bikes_data = request.get_json()
    bikes = []
    for bike_data in bikes_data:
        bike = Bike(
            brand=bike_data['brand'],
            model=bike_data['model'],
            bike_photo=bike_data['bike_photo'],
            ask_1_license=bike_data['ask_1_license'],
            ask_11_limitable=bike_data['ask_11_limitable'],
            ask_2_wheels=bike_data['ask_2_wheels'],
            ask_3_surface=bike_data['ask_3_surface'],
            ask_31_surface_offroad=bike_data['ask_31_surface_offroad'],
            ask_311_motor_offroad=bike_data['ask_311_motor_offroad'],
            ask_32_custom=bike_data['ask_32_custom'],
            ask_321_refrigeration=bike_data['ask_321_refrigeration'],
            ask_4_comodity=bike_data['ask_4_comodity'],
            ask_5_style=bike_data['ask_5_style'],
            ask_6_price=bike_data['ask_6_price'],
            ask_7_new=bike_data['ask_7_new'],
            ask_8_response=bike_data['ask_8_response'],
            ask_9_reliability=bike_data['ask_9_reliability'],
            ask_10_power=bike_data['ask_10_power'],
            ask_11_armor=bike_data['ask_11_armor']
        )
        bikes.append(bike)
        db.session.add(bike)
    db.session.commit()
    return jsonify([bike.serialize() for bike in bikes])
