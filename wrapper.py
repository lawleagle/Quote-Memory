from header import *


@app.route('/api/forgotPassword', methods=['POST'])
def forgot_password():
    result = {}
    result['success'] = True
    return result


@app.route('/api/isAuthenticated', methods=['GET'])
def authentication_check():
    result = {}
    if current_user.is_authenticated:
        result['authenticated'] = True
        result['user'] = current_user.get_id()
        return jsonify(result)
    result['authenticated'] = False
    return jsonify(result)


@app.route('/api/activate_user/<string:token_id>')
def activate_user(token_id):
    try:
        token = UserActivationToken.objects.with_id(token_id)
    except:
        return "The required activation token does not exist."

    if (token.expiration_date < datetime.now()):
        try:
            token.user.delete()
        except:
            pass
        token.delete()
        return "The activation link is no longer valid. Try to register again!"

    token.user.active = True
    token.user.save()
    return "Your account is successfully activated!"



@app.route('/api/signup', methods = ['POST'])
def signup():
    req = json.loads(request.data.decode() or '{}')

    try:
        user = User.objects(email = req['email'])[0]
        return "Email is taken!"
        return make_response("Email is taken!", 401)
    except:
        pass

    user = User()
    user.email = req['email']
    user.set_password(req['password'])
    user.save()

    token = UserActivationToken()
    token.user = user
    token.expiration_date = datetime.now() + timedelta(days = 1)

    token.save()

    Mailer.send_mail('lawleagle@gmail.com',
                     'Quote Memory: Registration complete!',
'''Hello from Quote Memory!
Hope you are fine!
Follow this link to activate your account: http://quote-memory.tk/api/activate_user/{}
We wish you the best and fun with our application!'''.format(token.id))
    
    return "Success!"


@app.route('/api/resend_activation', methods = ['POST'])
def resend_activation():
    req = json.loads(request.data.decode() or '{}')

    try:
        user = User.objects(email = req['email'])[0]
        if (user.is_active()):
            return "User is already activated!"
    except:
        return "That email is not registered!"

    token = UserActivationToken()
    token.user = user
    token.expiration_date = datetime.now() + timedelta(days = 1)

    token.save()

    Mailer.send_mail('lawleagle@gmail.com',
                     'Quote Memory: Registration complete!',
'''Hello from Quote Memory!
Hope you are fine!
Follow this link to activate your account: http://quote-memory.tk/api/activate_user/{}
We wish you the best and fun with our application!'''.format(token.id))
    
    return "Success!"


@app.route('/api/login', methods = ['POST', 'GET'])
def login():
    req = json.loads(request.data.decode() or '{}')
    result = {}
    if not 'email' in req or not 'password' in req:
        result['authenticated'] = False
        result['errorMessage'] = "Invalid logging request data. No 'email' in request"
        return jsonify(result)

    try:
        user = User.objects(email = req['email'])[0]
    except:
        result['authenticated'] = False
        result['errorMessage'] = 'Invalid email or password.'
        return jsonify(result)
        
    try:
        if not user.is_active():
            result['authenticated'] = False
            result['errorMessage'] = 'User is not activate. Check your email to activate your user.'
            return jsonify(result)
    except:
        result['authenticated'] = False
        result['errorMessage'] = 'Invalid email or password.'
        return jsonify(result)
        
    if not user.authenticate(req['password']):
        result['authenticated'] = False
        result['errorMessage'] = 'Invalid email or password.'
        return jsonify(result)

    login_user(user)
    result['authenticated'] = True
    result['user'] = current_user.get_id()
    return jsonify(result)


@app.route('/api/logout', methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    result = {}
    result['success'] = True
    return jsonify(result)


@app.route('/api/quotes')
def get_quotes():
    return Quote.objects().to_json()


@app.route('/api/quote')
def get_quote():
    return Quote.objects[0].to_json()


@app.route('/api/quote', methods = ['POST'])
def post_quote():
    req = json.loads(request.data.decode() or '{}')

    quote = Quote()
    quote.translation = req['translation']
    quote.book = req['book']
    quote.chapter = req['chapter']
    quote.first_verse = req['first_verse']
    quote.last_verse = req['last_verse']
    quote.text = req['text']
    quote.save()
    
    return 'MANU'


@app.route('/static/<string:path>')
def get_static(path):
    with open('static/' + path, 'r') as file:
        s = file.read()
        return s
    

@app.route('/')
def get_index():
    with open('static/index.html', 'r') as file:
        return file.read()
