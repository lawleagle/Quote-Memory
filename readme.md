
# Quote Memory

# Installation

For the instalation, I use chocolatey package manager for windows (from admin command prompt).

0. Clone this repository.
1. Install required programs (mongodb, python3): choco install -y mongodb python nodejs npm
2. Install Python pip packages (global command): pip install mongoengine flask flask-login passlib flask-cors
3. (optional) Add mongodb installation folder to environment variables (C:\Program Files\MongoDB\3.2\Server\bin)
4. Create folder "C:\data\db" (for mongodb)
5. Start mongodb local server (global command): mongod
6. Start mongo shell (global command): mongo
7. Add a user to the database (so mongoengine can access the database): db.createUser({user:"memory", pwd:"memoryadmin", roles:[{role:"readWrite",db:"quotememory"}]})
8. Run (run command from repo folder): python run.py
9. Install angular-cli (global command): npm install -g angular-cli
10. From the web forlder of the project serve the angular2 project: npm start
11. Access project @ http://localhost:80


# Development Notes
All the python files are automatically reloaded on change by flask.
All the angular2 files are automatically reloaded by webpack-dev-server
Seamless workflow without restarting anything. If python finishes execution with an exception thrown, then python-server needs to pe started again: python run.py.
/api/** gets redirected to the python server (port 2000)
/static/** gets redirected to the python server also
Static files are served from the static folder of the root directory.