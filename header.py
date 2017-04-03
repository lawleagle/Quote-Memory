
import logging
logging.basicConfig(level = logging.INFO)
logger = logging.getLogger('QuoteMemory')


import json
from pprint import pprint
from datetime import datetime, timedelta

from flask import Flask, jsonify, request, make_response
from flask_login import login_user, login_required, logout_user, LoginManager

from models import *
from mailer import Mailer


app = Flask(__name__)
app.secret_key = 'Love will last forever.'
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(email):
    try:
        user = User.objects(email = email)[0]
        logger.info('Identity: {}'.format(user.email))
        return user
    except:
        logger.error('Could not load user: {}'.format(email))
        return None
