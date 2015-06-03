from flask import Flask, jsonify, make_response
from flask.ext.mongoalchemy import MongoAlchemy
from flask.ext.cors import CORS
import datetime
import json
from bson.objectid import ObjectId
from werkzeug import Response

app = Flask(__name__)
app.config['MONGOALCHEMY_DATABASE'] = 'flask-react-todo'
db = MongoAlchemy(app)
cors = CORS(app)

class MongoJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime.datetime, datetime.date)):
            return obj.isoformat()
        elif isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)
 
def jsonify(*args, **kwargs):
    return Response(json.dumps(*args, cls=MongoJsonEncoder), mimetype='application/json', **kwargs)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)
    
@app.route('/')
def index():
    return "Hello, World!"
    
from api.routes import task