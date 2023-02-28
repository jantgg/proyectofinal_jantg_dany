from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
import re

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(105), nullable=False)
    email = db.Column(db.String(30), nullable=False, unique=True)
    active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'{self.user_name}'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email
        }

    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name:
            raise AssertionError('Username not provided')
        if User.query.filter_by(user_name=user_name).first():
            raise AssertionError('The username is being used by another user or photographer')
        if len(user_name) < 5 or len(user_name) > 20:
            raise AssertionError('The username must be between 5 and 20 characters')
        return user_name 

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError('Email not provided')
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            raise AssertionError('The email provided is not a valid email')
        if User.query.filter_by(email=email).first():
            raise AssertionError('The email provided is being used by another user or photographer')
        return email


class Photographer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(105), nullable=False)
    email = db.Column(db.String(30), nullable=False, unique=True)
    active = db.Column(db.Boolean, default=True)
    location_text = db.Column(db.String(50))
    instagram = db.Column(db.String(30), unique=True)
    services_text = db.Column(db.String(100), unique=True)
    find_me_text = db.Column(db.String(50))
    location_name = db.Column(db.String(50))
    latitude = db.Column(db.String(20))
    longitude = db.Column(db.String(20))
    photos = db.relationship('Photo')

    def __repr__(self):
        return f'{self.user_name}'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "location_text": self.location_text,
            "instagram": self.instagram,
            "services_text": self.services_text,
            "find_me_text": self.find_me_text,
            "location_name": self.location_name,
            "latitude": self.latitude,
            "longitude": self.longitude
        }

    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name:
            raise AssertionError('Username not provided')
        if User.query.filter_by(user_name=user_name).first():
            raise AssertionError('The username is being used by another user or photographer')
        if len(user_name) < 5 or len(user_name) > 20:
            raise AssertionError('The username must be between 5 and 20 characters')
        return user_name 

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError('Email not provided')
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            raise AssertionError('The email provided is not a valid email')
        if User.query.filter_by(email=email).first():
            raise AssertionError('The email provided is being used by another user or photographer')
        return email


class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    start_location_text = db.Column(db.String(50), nullable=False, unique=True)
    end_location_text = db.Column(db.String(50), nullable=False, unique=True)
    interest_text = db.Column(db.String(250), nullable=False, unique=True)
    start_location_name = db.Column(db.String(50), nullable=False)
    start_latitude = db.Column(db.String(20), nullable=False)
    start_longitude = db.Column(db.String(20), nullable=False)
    end_location_name = db.Column(db.String(50), nullable=False)
    end_latitude = db.Column(db.String(20), nullable=False)
    end_longitude = db.Column(db.String(20), nullable=False)
    photos = db.relationship('Photo')

    def __repr__(self):
        return f'{self.name}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "start_location_text": self.start_location_text,
            "end_location_text": self.end_location_text,
            "interest_text": self.interest_text,
            "start_location_name": self.start_location_name,
            "start_latitude": self.start_latitude,
            "start_longitude": self.start_longitude,
            "end_location_name": self.end_location_name,
            "end_latitude": self.end_latitude,
            "end_longitude": self.end_longitude
        }

class Bike(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(50), nullable=False, unique=False)
    model = db.Column(db.String(50), nullable=False, unique=True)
    bike_photo = db.Column(db.String(250), nullable=False, unique=True)
    ask_1_license = db.Column(db.String(5), nullable=False)
    ask_11_limitable = db.Column(db.String(5), default=False, nullable=False)
    ask_2_wheels = db.Column(db.String(5), nullable=False)
    ask_3_surface = db.Column(db.String(5), nullable=False)
    ask_31_surface_offroad = db.Column(db.String(5), nullable=False)
    ask_311_motor_offroad = db.Column(db.String(5), nullable=False)
    ask_32_custom = db.Column(db.String(5), nullable=False)
    ask_321_refrigeration = db.Column(db.String(5), nullable=False)
    ask_4_comodity = db.Column(db.String(5), nullable=False)
    ask_5_style = db.Column(db.String(5), nullable=False)
    ask_6_price = db.Column(db.String(5), nullable=False)
    ask_7_new = db.Column(db.String(5), nullable=False)
    ask_8_response = db.Column(db.String(5), nullable=False)
    ask_9_reliability = db.Column(db.String(5), nullable=False)
    ask_10_power = db.Column(db.String(5), nullable=False)
    ask_11_armor = db.Column(db.String(5), nullable=False)
    photos = db.relationship('Photo')

    def __repr__(self):
        return f'{self.brand} {self.model}'

    def serialize(self):
        return {
            "id": self.id,
            "brand": self.brand,
            "model": self.model,
            "bike_photo": self.bike_photo,
            "ask_1_license": self.ask_1_license,
            "ask_11_limitable": self.ask_11_limitable,
            "ask_2_wheels": self.ask_2_wheels,
            "ask_3_surface": self.ask_3_surface,
            "ask_31_surface_offroad": self.ask_31_surface_offroad,
            "ask_311_motor_offroad": self.ask_311_motor_offroad,
            "ask_32_custom": self.ask_32_custom,
            "ask_321_refrigeration": self.ask_321_refrigeration,
            "ask_4_comodity": self.ask_4_comodity,
            "ask_5_style": self.ask_5_style,
            "ask_6_price": self.ask_6_price,
            "ask_7_new": self.ask_7_new,
            "ask_8_response": self.ask_8_response,
            "ask_9_reliability": self.ask_9_reliability,
            "ask_10_power": self.ask_10_power,
            "ask_11_armor": self.ask_11_armor
        }

class Question(db.Model): 
    id = db.Column(db.String(30), primary_key=True, unique=True)
    question = db.Column(db.String(250), nullable=False)
    notes = db.Column(db.String(250), nullable=True)


    def __repr__(self):
        return f'Question {self.id}: {self.question}'

    def serialize(self):
        return {
            "id": self.id,
            "question": self.question,
            "notes": self.notes
        }


class Answer(db.Model):
    id = db.Column(db.String(30), primary_key=True, unique=True)
    answer = db.Column(db.String(250), nullable=False)
    next_question_id = db.Column(db.String(30), db.ForeignKey('question.id'))
    current_question_id = db.Column(db.String(30), db.ForeignKey('question.id'))
    current_question = db.relationship('Question', foreign_keys=[current_question_id], backref='answers')
    next_question = db.relationship('Question', foreign_keys=[next_question_id])

    def __repr__(self):
        return f'Answer: {self.answer}'

    def serialize(self):
        return {
            "id": self.id,
            "answer": self.answer,
            "next_question_id": self.next_question_id,
            "current_question_id": self.current_question_id,
        }


class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    path = db.Column(db.String(250), nullable=False, unique=True)
    photo_type = db.Column(db.String(50), nullable=False)
    bike_id = db.Column(db.Integer, db.ForeignKey('bike.id'))
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographer.id'))
    route_id = db.Column(db.Integer, db.ForeignKey('route.id'))

    def __repr__(self):
        return f'{self.name}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "path": self.path,
            "photo_type": self.photo_type
        }


class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='favorites')
    bike_id = db.Column(db.Integer, db.ForeignKey('bike.id'))
    bike = db.relationship('Bike')
    route_id = db.Column(db.Integer, db.ForeignKey('route.id'))
    route = db.relationship('Route') 
    photographer = db.relationship('Photographer')
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographer.id'))

    def __repr__(self):
        return f'User favorites {self.user}: Motorbikes: {self.bike}, Routes: {self.route}, Photographers: {self.photographer}'
