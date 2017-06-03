from header import *
from routes import Routes


@app.route('/ping')
@app.route('/api/ping')
def ping():
    return 'pong'


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


@app.route(Routes.ACTIVATE_USER.format('<string:token_id>'))
def activate_user(token_id):
    response = {}
    token = UserActivationToken.objects.with_id(token_id)
    if not token:
        response['success'] = False
        response['errorMessage'] = 'Link is invalid.'
        return jsonify(response)

    if (token.user.active):
        token.delete()
        response['sucess'] = False
        response['errorMessage'] = 'User is already active!'
        return jsonify(response)

    if (token.expiration_date < datetime.now()):
        token.delete()
        response['success'] = False
        response['errorMessage'] = 'The activation link expired.'
        return jsonify(response)

    token.user.active = True
    token.user.save()
    token.delete()

    response['success'] = True
    response['message'] = 'Your account is successfully activated!'
    return jsonify(response)



@app.route('/api/signup', methods = ['POST'])
def signup():
    req = json.loads(request.data.decode() or '{}')
    response = {}

    try:
        user = User.objects(email = req['email'])[0]
        response['success'] = False
        response['errorMessage'] = 'That email is taken!'
        return jsonify(response)

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

    Mailer.send_mail(user.email,
                     'Quote Memory: Registration complete!',
'''Hello from Quote Memory!
Hope you are fine!
Follow this link to activate your account: http://quote-memory.tk/{}
We wish you the best and fun with our application!'''.format(Routes.ACTIVATE_USER.format(token.id)))

    response['success'] = True
    return jsonify(response)


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
Follow this link to activate your account: http://quote-memory.tk/{}
We wish you the best and fun with our application!'''.format(Routes.ACTIVATE_USER.format(token.id)))
    
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
        
    # try:
    #     if not user.is_active():
    #         result['authenticated'] = False
    #         result['errorMessage'] = 'User is not activate. Check your email to activate your user.'
    #         return jsonify(result)
    # except:
    #     result['authenticated'] = False
    #     result['errorMessage'] = 'Invalid email or password.'
    #    return jsonify(result)
        
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
@login_required
def get_quotes():
    user = User.objects(email = current_user.get_id())[0]
    return Quote.objects(user = user).to_json()


@app.route('/api/quote')
@login_required
def get_quote():
    quote = Quote()
    quote.identifier = 'ManuQuote Title'
    quote.text = 'ManuQuote Text'
    return quote.to_json()


@app.route('/api/quote', methods = ['POST'])
@login_required
def post_quote():
    req = json.loads(request.data.decode() or '{}')
    response = {}

    identifier = req['identifier']
    text = req['text']

    if not identifier or identifier == '':
        response['success'] = False
        response['errorMessage'] = 'Identifier cannot be empty!'
        return jsonify(response)
    if not text or text == '':
        response['success'] = False
        response['errorMessage'] = 'Text cannot be empty!'
        return jsonify(response)

    try:
        quote = Quote()
        quote.identifier = identifier
        quote.text = text
        quote.user = User.objects(email = current_user.get_id())[0]
        quote.save()
    except:
        response['success'] = False
        response['errorMessage'] = 'You already used that identifier. Try another!'
        return jsonify(response)

    response['success'] = True;
    return jsonify(response)

@app.route('/api/quote/<string:identifier>', methods = ['DELETE'])
@login_required
def delete_quote(identifier):
    user = User.objects(email = current_user.get_id())[0]
    quote = Quote.objects(user = user, identifier = identifier)[0]
    quote.delete()

    response = {}
    response['success'] = True;
    return jsonify(response)


@app.route('/api/startQuiz')
@login_required
def startQuiz():
    user = User.objects(email = current_user.get_id())[0]
    quote = random.choice(Quote.objects(user = user))

    token = QuizToken()
    token.quote = quote
    token.save()

    response = {}
    response['success'] = True
    response['token'] = token.id.__str__()
    response['quote'] = json.loads(quote.to_json())
    return jsonify(response)


@app.route('/api/finishQuiz', methods = ['POST'])
@login_required
def finishQuiz():
    req = json.loads(request.data.decode() or '{}')
    token_id = req['token']
    text = req['text']

    response = {}
    user = User.objects(email = current_user.get_id())[0]

    token = QuizToken.objects.with_id(token_id)
    if not token:
        response['success'] = False
        response['errorMessage'] = 'You already solved this quiz!'
        return jsonify(response)
    
    quote = token.quote
    if quote.user != user:
        response['success'] = False
        response['errorMessage'] = 'Bad request.'
        return jsonify(response)

    if quote.text != text:
        response['success'] = False
        response['errorMessage'] = 'Wrong text.'
        return jsonify(response)
    
    quote.level += 1
    quote.save()
    token.delete()

    response['success'] = True
    return jsonify(response)
        
@app.route('/api/statistics')
@login_required
def statistics():
    user = User.objects(email = current_user.get_id())[0]

    quotes = Quote.objects(user = user)
    return quotes.to_json()
