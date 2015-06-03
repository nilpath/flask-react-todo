from flask import abort, request

from api import app
from api import jsonify
from api.models.task import Task

def find_task(task_id):
    return Task.query.get(task_id)
    
def next_order():
    task = Task.query.descending(Task.order).first()
    return task.order + 1

def valid_request(request):
    if not request.json:
        return False
    if 'description' in request.json and type(request.json['description']) is not str:
        return False
    if 'done' in request.json and type(request.json['done']) is not bool:
        return False
    if 'order' in request.json and type(request.json['order']) is not int:
        return False
    
    return True

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.ascending(Task.order).all()
    results = []
    for task in tasks:
        results.append(task.wrap())
    return jsonify(results)

@app.route('/api/tasks/<string:task_id>', methods=['GET'])
def get_task(task_id):
    task = find_task(task_id)
    if task is None:
        abort(404)
    result = task.wrap()
    
    return jsonify(result)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    if not request.json or not 'description' in request.json:
        abort(400)
    task = Task(description=request.json['description'], order=next_order(), done=False)
    task.save()
    result = task.wrap()
    
    return jsonify(result), 201
    
@app.route('/api/tasks/<string:task_id>', methods=['PUT'])
def update_task(task_id):
    task = find_task(task_id)
    if task is None:
        abort(404)
    if not valid_request(request):
        abort(400)
    
    task.description = request.json['description']
    task.order = request.json['order']
    task.done = request.json['done']
    task.save()
    result = task.wrap()
    
    return jsonify(result)

@app.route('/api/tasks/<string:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = find_task(task_id)
    if task is None:
        abort(404)
    task.remove()
    return jsonify({'result': True})