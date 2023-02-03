from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(250), nullable=False, unique=True)
    passsword = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False, unique=True)
    active = db.Column(db.Boolean, default=True)

class Photographer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(250), nullable=False, unique=True)
    passsword = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False, unique=True)
    active = db.Column(db.Boolean, default=True)
    location_text = db.Column(db.String(250), nullable=False, unique=True)
    instagram = db.Column(db.String(250), nullable=False, unique=True)
    services_text = db.Column(db.String(250), nullable=False, unique=True)
    find_me_text = db.Column(db.String(250), nullable=False, unique=True)
    location_name = db.Column(db.String(250), nullable=False)
    latitude = db.Column(db.String(250), nullable=False)
    longitude = db.Column(db.String(250), nullable=False)
    photos = db.relationship('Photo')


class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False, unique=True)
    active = db.Column(db.Boolean, default=True)
    start_location_text = db.Column(db.String(250), nullable=False, unique=True)
    end_location_text = db.Column(db.String(250), nullable=False, unique=True)
    interest_text = db.Column(db.String(250), nullable=False, unique=True)
    start_location_name = db.Column(db.String(250), nullable=False)
    start_latitude = db.Column(db.String(250), nullable=False)
    start_longitude = db.Column(db.String(250), nullable=False)
    end_location_name = db.Column(db.String(250), nullable=False)
    end_latitude = db.Column(db.String(250), nullable=False)
    end_longitude = db.Column(db.String(250), nullable=False)
    photos = db.relationship('Photo')

   

class Bike(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False, unique=True)
    bike_photo = db.Column(db.String(250), nullable=False, unique=True)
    ask_1_license = db.Column(db.String(250), nullable=False)
    ask_11_limitable = db.Column(db.Boolean, default=True)
    ask_2_wheels = db.Column(db.String(250), nullable=False)
    ask_3_surface = db.Column(db.String(250), nullable=False)
    ask_31_surface_offroad = db.Column(db.String(250), nullable=False)
    ask_311_motor_offroad = db.Column(db.String(250), nullable=False)
    ask_32_custom = db.Column(db.String(250), nullable=False)
    ask_321_refrigeration = db.Column(db.String(250), nullable=False)
    ask_4_comodity = db.Column(db.String(250), nullable=False)
    ask_5_style = db.Column(db.String(250), nullable=False)
    ask_6_price = db.Column(db.String(250), nullable=False)
    ask_7_new = db.Column(db.String(250), nullable=False)
    ask_8_response = db.Column(db.String(250), nullable=False)
    ask_9_reliability = db.Column(db.String(250), nullable=False)
    ask_10_power = db.Column(db.String(250), nullable=False)
    ask_11_armor = db.Column(db.String(250), nullable=False)
    active = db.Column(db.Boolean, default=True)
    def __repr__(self):
        return f'{self.name}'




class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    path = db.Column(db.String(250), nullable=False, unique=True)
    photo_type = db.Column(db.String(250), nullable=False, unique=True)
    active = db.Column(db.Boolean, default=True)
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographer.id'))
    route_id = db.Column(db.Integer, db.ForeignKey('route.id'))

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
