

from mongoengine import Document, StringField, IntField, BooleanField, DateTimeField, ReferenceField
from passlib.apps import custom_app_context as hasher


class Quote(Document):
    identifier = StringField(requored = True)
    text = StringField(required = True)
    

class User(Document):
    active = BooleanField(required = True, default = True)
    email = StringField(required = True, unique = True) # 
    password = StringField(required = True)

    def __init__(self, *args, **kwargs):
        Document.__init__(self, *args, **kwargs)
        self.authenticated = False

    def set_password(self, password):
        self.password = hasher.encrypt(password)

    def authenticate(self, password):
        if hasher.verify(password, self.password):
            self.authenticated = True
        return self.authenticated

    def is_authenticated(self):
        return self.authenticated

    def is_active(self):
        return self.active

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.email

    def verify_password(self, password):
        return hasher.verify(password, self.password)


class UserActivationToken(Document):
    expiration_date = DateTimeField(required = True)
    user = ReferenceField(User, required = True)
    
