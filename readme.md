
# Quote Memory

# Installation

For the instalation, I use chocolatey package manager for windows (from admin command prompt).

0. Clone this repository.
1. Install Python (global command): choco install python -y
2. Install Python pip packages (global command): pip install mongoengine flask flask-login passlib
3. Install MongoDB (global command): choco install mongodb -y
4. (optional) Add mongodb installation folder to environment variables (C:\Program Files\MongoDB\3.2\Server\bin)
5. Create folder "C:\data\db" (for mongodb)
6. Start mongodb local server (global command): mongod
7. Start mongo shell (global command): mongo
8. Add a user to the database (so mongoengine can access the database): db.createUser({user:"memory", pwd:"memoryadmin", roles:[{role:"readWrite",db:"quotememory"}]})
9. Run (run command from repo folder): python run.py


# Ideal features list:
- authentication
- google, facebook, twitter login
- classify quotes
- share your quotes
- random quote (quote of the day)
- predefined quote repositories (categories)
- rating of quotes (like-dislike)
- report quote
- add private quote (maybe just for paid)
- add public quote
- delete quote (if yours)
- update quote (if yours)
- statistics
- global quiz, quiz of the day
- level system (with points and stuff)
- group learning
- add friend
- friends list
