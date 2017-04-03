
import mongoengine


mongoengine.connect(host = 'mongodb://memory:memoryadmin@127.0.0.1/quotememory')

from wrapper import app
app.run(debug = True, host = '0.0.0.0', port = 2000)
