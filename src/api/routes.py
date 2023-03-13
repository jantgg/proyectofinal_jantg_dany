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
from werkzeug.utils import secure_filename
import cloudinary
import json

api = Blueprint('api', __name__)

#@@@------------------------------------------- ##### REGISTROS OF USERS ##### ------------------------------------------------@@@>

# REGISTER OF USER --------------------------------------------------------------------------------------------------------------->

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


# REGISTER OF PHOTOGRAPHER ------------------------------------------------------------------------------------------------------->
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


#@@@--------------------------------------------- ##### LOGIN OF USERS ##### --------------------------------------------------@@@>


# LOGIN OF USER ------------------------------------------------------------------------------------------------------------------>
@api.route('/login', methods=['POST'])
def user_login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user = User.query.filter_by(email=body_email).first()
    photographer = Photographer.query.filter_by(email=body_email).first()
    token = None
    user_id = None
    if not user and not photographer:
        return jsonify({"error": "This user or photographer does not exist"}), 401
    if user and check_password_hash(user.password, body_password):
        token = create_access_token(identity=user.email)
        user_id = user.id
    elif photographer and check_password_hash(photographer.password, body_password):
        token = create_access_token(identity=photographer.email)
        user_id = photographer.id
    else:
        return jsonify({"error": "The entered password is incorrect."}), 401
    return jsonify({"token": token, "user_id": user_id}), 200


# REVIEW TYPE OF USER/PHOTOGRAPHER ----------------------------------------------------------------------------------------------->
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





#@@@------------------------------------------- ##### INITIALS GET ENDPOINTS ##### --------------------------------------------@@@>


# GET OF USERS ------------------------------------------------------------------------------------------------------------------->
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users_serialized = [x.serialize() for x in users]
    return jsonify({"body": users_serialized}), 200


# GET OF PHOTOGRAPHERS ----------------------------------------------------------------------------------------------------------->
@api.route('/photographers', methods=['GET'])
def get_all_photographers():
    photographers = Photographer.query.all()
    photographers_serialized = [x.serialize() for x in photographers]
    return jsonify({"body": photographers_serialized}), 200


# GET OF BIKES ------------------------------------------------------------------------------------------------------------------->
@api.route('/bikes', methods=['GET'])
def get_all_bikes():
    bikes = Bike.query.all()
    bikes_serialized = [x.serialize() for x in bikes]
    return jsonify({"body": bikes_serialized}), 200


# GET OF PHOTOS ------------------------------------------------------------------------------------------------------------------>
@api.route('/photos', methods=['GET'])
def get_all_photos():
    photos = Photo.query.all()
    photos_serialized = [x.serialize() for x in photos]
    return jsonify({"body": photos_serialized}), 200
    

# GET OF QUESTIONS --------------------------------------------------------------------------------------------------------------->
@api.route('/questions', methods=['GET'])
def get_all_questions():
    questions = Question.query.all()
    questions_serialized = [x.serialize() for x in questions]
    return jsonify({"body": questions_serialized}), 200


# GET OF ANSWERS ----------------------------------------------------------------------------------------------------------------->
@api.route('/answers', methods=['GET'])
def get_all_answers():
    answers = Answer.query.all()
    answers_serialized = [x.serialize() for x in answers]
    return jsonify({"body": answers_serialized}), 200


# GET OF ROUTES ------------------------------------------------------------------------------------------------------------------>
@api.route('/routes', methods=['GET'])
def get_all_routes():
    routes = Route.query.all()
    routes_serialized = []
    for route in routes:
        route_serialized = route.serialize()
        photos = [photo.serialize() for photo in route.photos]
        route_serialized['photos'] = photos
        route_serialized['user_id'] = str(route.user_id)
        routes_serialized.append(route_serialized) 
    return jsonify({"body": routes_serialized}), 200



# GET OF FAVORITES --------------------------------------------------------------------------------------------------------------->
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
            route_data = favorite.route.serialize()
            route_photos = [photo.serialize() for photo in favorite.route.photos]
            route_data['photos'] = route_photos
            favorite_data['route'] = route_data
        if favorite.photographer is not None:
            favorite_data['photographer'] = favorite.photographer.serialize()
        favorites_data.append(favorite_data)
    return jsonify({'body': favorites_data}), 200


# POST OF FAVORITES -------------------------------------------------------------------------------------------------------------->
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

# DELETE DE FAVORITES -------------------------------------------------------------------------------------------------------->

@api.route('/favorites', methods=['DELETE'])
@jwt_required()
def delete_favorite():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Obtener los parámetros de la solicitud
    bike_id = request.json.get('bike_id')
    route_id = request.json.get('route_id')
    photographer_id = request.json.get('photographer_id')

    # Validar que al menos un parámetro esté presente
    if not bike_id and not route_id and not photographer_id:
        return jsonify({'error': 'At least one parameter like bike_id is required'}), 400

    # Eliminar los favoritos correspondientes al usuario y los parámetros de la solicitud
    favorites_query = Favorite.query.filter(Favorite.user_id == user.id)
    if bike_id:
        favorites_query = favorites_query.filter(Favorite.bike_id == bike_id)
    if route_id:
        favorites_query = favorites_query.filter(Favorite.route_id == route_id)
    if photographer_id:
        favorites_query = favorites_query.filter(Favorite.photographer_id == photographer_id)
    deleted_count = favorites_query.delete()

    db.session.commit()

    # Devolver el número de favoritos eliminados
    return jsonify({'message': f'{deleted_count} favorites deleted'}), 200

# FILTER DE BIKES/ANSWERS -------------------------------------------------------------------------------------------------------->
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


# CLOUDINARY --------------------------------------------------------------------------------------------------------------------->
@api.route('/photos', methods=['POST'])
@jwt_required()
def upload_photo():
    photo_file = request.files.getlist("files")
    photo_type = request.form['photo_type']
    upload_type = request.form['upload_type']
    user_email = get_jwt_identity()
    user_id = User.query.filter_by(email=user_email).first()
    new_photos=[]
    if upload_type == 'single_photo':
        single_photo_route_id = request.form['route_id']

        for photo in photo_file:
            upload_result = cloudinary.uploader.upload(photo, secure=True)
            new_photos.append(Photo(
                name=secure_filename(photo.filename),
                path=upload_result['url'],
                route_id=single_photo_route_id,
                photo_type=photo_type))
            for photo in new_photos:
                    db.session.add(photo)
                    db.session.commit()
            return jsonify([x.serialize() for x in new_photos])
    else: 
        if photo_type == 'route':
            route_data = json.loads(request.form['route_data'])
            new_route = Route(
                name=route_data['name'],
                interest_text=route_data['interest_text'],
                start_location_name=route_data['start_location_name'],
                end_location_name=route_data['end_location_name'],
                user_id = user_id,)
            db.session.add(new_route)
            db.session.commit()  # Confirma los cambios en la base de datos para obtener la ID
            route_id = new_route.id  # Obtiene la ID de la nueva ruta
            for photo in photo_file:
                upload_result = cloudinary.uploader.upload(photo, secure=True)
                new_photos.append(Photo(
                    name=secure_filename(photo.filename),
                    path=upload_result['url'],
                    route_id=route_id,
                    photo_type=photo_type))
        elif photo_type == 'photographer':
            for photo in photo_file:
                upload_result = cloudinary.uploader.upload(photo, secure=True)
                new_photos.append(Photo(
                    name=secure_filename(photo.filename),
                    path=upload_result['url'],
                    photographer_id=type_id,
                    photo_type=photo_type,))
        elif photo_type == 'bike':
            for photo in photo_file:
                upload_result = cloudinary.uploader.upload(photo, secure=True)
                new_photos.append(Photo(
                    name=secure_filename(photo.filename),
                    path=upload_result['url'],
                    bike_id=type_id,
                    photo_type=photo_type))
        else:
            return jsonify({"error": "Invalid photo_type parameter"}), 400
        for photo in new_photos:
            db.session.add(photo)
            db.session.commit()
        return jsonify([x.serialize() for x in new_photos])


#@@@------------------------------------------ ##### Endpoints for INSOMNIA ##### ---------------------------------------------@@@>


# Endpoint ROUTES ---------------------------------------------------------------------------------------------------------------->
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
    response_dict = {"response": "Route send successfully", "route_ids": [r.id for r in new_routes]}
    return jsonify(response_dict), 200


#Endpoint BIKES ------------------------------------------------------------------------------------------------------------------>
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


# Endpoint QUESTIONS ------------------------------------------------------------------------------------------------------------->
@api.route('/questions', methods=['POST'])
def create_questions():
    questions_data = request.get_json()
    questions = []
    for question_data in questions_data:
        question = Question(
            id=question_data['id'],
            question=question_data['question'],
            notes=question_data['notes'],
        )
        questions.append(question)
        db.session.add(question)
    db.session.commit()
    return jsonify([question.serialize() for question in questions])


# Endpoint ANSWERS --------------------------------------------------------------------------------------------------------------->
@api.route('/answer', methods=['POST'])
def create_answers():
    answers_data = request.get_json()
    answers = []
    for answer_data in answers_data:
        answer = Answer(
            id=answer_data['id'],
            answer=answer_data['answer'],
            previous_question_id=answer_data['previous_question_id'],
            next_question_id=answer_data['next_question_id'],
            current_question_id=answer_data['current_question_id'],
        )
        answers.append(answer)
        db.session.add(answer)
    db.session.commit()
    return jsonify([answer.serialize() for answer in answers])