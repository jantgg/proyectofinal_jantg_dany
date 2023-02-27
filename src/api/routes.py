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


# LOGIN DE USER --------------------------------------------------------------------------------------->

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


# REGISTRO DE USER ------------------------------------------------------------------------------------->

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


# REGISTRO DE FOTOGRAFO ------------------------------------------------------------------------------->

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


# REVISAR TIPO DE USER/FOTOGRAFO ----------------------------------------------------------------------->

@api.route('/sync', methods=['GET'])
@jwt_required()
def sync_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    photographer = Photographer.query.filter_by(email=email).first()
    if not user and not photographer:
        return jsonify ({"type": None}), 401
    if user: return jsonify({"type": "Usuario"}), 200
    if photographer: return jsonify({"type": "Fotógrafo"}), 200


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