  
import os
from flask_admin import Admin
from .models import db, User, Photographer, Photo, Route, Favorite, Bike, Question, Answer
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class MyModel(ModelView):
        column_display_pk = True
  

    class MyQuestionModel(MyModel):
        form_columns = ('id', 'question', 'notes', 'answers')

    class MyAnswerModel(MyModel):
        form_columns = ('id', 'answer', 'next_question_id', 'current_question_id')
    class MyRouteModel(MyModel):
        form_columns = ('id','name','interest_text','start_location_name', 'end_location_name', 'photos', 'creator_id')

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(MyModel(User, db.session))
    admin.add_view(MyModel(Photographer, db.session))
    admin.add_view(MyModel(Photo, db.session))
    admin.add_view(MyModel(Route, db.session))
    admin.add_view(MyModel(Favorite, db.session))
    admin.add_view(MyModel(Bike, db.session))
    admin.add_view(MyQuestionModel(Question, db.session))
    admin.add_view(MyAnswerModel(Answer, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))