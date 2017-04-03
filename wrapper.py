from header import *


@app.route('/api/authentication_check')
@login_required
def authentication_check():
    return 'You are authenticated.'


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



@app.route('/api/login', methods = ['POST'])
def login():
    req = json.loads(request.data.decode() or '{}')
    if not 'email' in req:
        return "Invalid logging request data. No 'email' in request"

    user = User.objects(email = req['email'])[0]
    try:
        if not user.is_active():
            return "User is not activate. Check your email to activate your user."
    except:
        return "Invalid email."
        
    if not user.authenticate(req['password']):
        return "Could not authenticate user. Invalid password"
    login_user(user)
    return "Success."


@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return 'Logged user out.'


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
