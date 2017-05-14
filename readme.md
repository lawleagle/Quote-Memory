
# Quote Memory

# Installation

For the instalation, I use chocolatey package manager for windows (from admin command prompt).

0. Clone this repository.
1. Install Python 3 (global command): choco install python -y
2. Install Python pip packages (global command): pip install mongoengine flask flask-login passlib flask-cors
3. Install MongoDB (global command): choco install mongodb -y
4. (optional) Add mongodb installation folder to environment variables (C:\Program Files\MongoDB\3.2\Server\bin)
5. Create folder "C:\data\db" (for mongodb)
6. Start mongodb local server (global command): mongod
7. Start mongo shell (global command): mongo
8. Add a user to the database (so mongoengine can access the database): db.createUser({user:"memory", pwd:"memoryadmin", roles:[{role:"readWrite",db:"quotememory"}]})
9. Run (run command from repo folder): python run.py
10. Install npm (global command): choco install npm -y
11. Install angular-cli (global command): npm install -g angular-cli
12. From the web forlder of the project serve the angular2 project: ng serve
13. Start chrome like this: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/chromedev"
14. Access project @ http://localhost:4200


# Development Notes
All the python files are automatically reloaded on change by flask.
All the angular2 files are automatically reloaded by ng.
Seamless workflow without restarting anything. If python finishes execution with an exception thrown, then python-server needs to pe started again: python run.py