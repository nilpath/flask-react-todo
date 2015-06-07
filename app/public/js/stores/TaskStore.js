var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../contants/TaskConstants.js');
var TaskAPI = require('../utils/TaskAPI.js');
var assign = require('object-assign');

var _tasks = [];

function setTasks(data) {
  _tasks = data;
}

function createTask(newTask) {
  TaskAPI.createTask(newTask);
}

function addTask(task) {
  _tasks.push(task);
}

function updateTask(task) {
  TaskAPI.updateTask(task);
}

function updateAll(updates) {
  for (var i = 0; i < updates.length; i++) {
    updateTask(updates[i]);
  }
}

function reorder(task, from, to) {
  _tasks.splice(to, 0, _tasks.splice(from,1)[0]);
}

var TaskStore = assign({}, EventEmitter.prototype, {
  
  getTasks: function () {
    return _tasks;
  },
  
  setTasks: function (tasks) {
    _tasks = tasks;
  },
  
  remainingItems: function () {
    var remaining = [];
    for (var i = 0; i < _tasks.length; i++) {
      if(!_tasks[i].done) {
        remaining.push(_tasks[i]);
      }
    }
    return remaining;
  },
  
  emitChange: function () {
    this.emit('change');
  },
  
  addChangeListener: function (callback) {
    this.addListener('change', callback);
  },
  
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }
  
});

AppDispatcher.register(function(payload) {
  switch (payload.actionType) {
    case TaskConstants.SET_TODOS:
      setTasks(payload.data);
      break;
      
    case TaskConstants.CREATE_TODO:
      createTask(payload.data);
      break;
      
    case TaskConstants.ADD_TODO:
      addTask(payload.data);
      break;
    
    case TaskConstants.SAVE_TODO:
      updateTask(payload.data);
      break;
    
    case TaskConstants.COMPLETE_ALL:
      updateAll(payload.data);
      break;
    
    case TaskConstants.REORDER:
      reorder(payload.data.task, payload.data.from, payload.data.to);
      break;
      
    case TaskConstants.SAVE_TODOS:
      updateAll(payload.data);
      break;
    
    default:
      break;
  }
  
  TaskStore.emitChange();
  
});

module.exports = TaskStore;