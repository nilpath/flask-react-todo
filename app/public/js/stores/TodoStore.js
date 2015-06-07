var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../contants/TodoConstants.js');
var TodoAPI = require('../utils/TodoAPI.js');
var assign = require('object-assign');

var _todos = [];

function setTodos(data) {
  _todos = data;
}

function createTodo(newTodo) {
  TodoAPI.createTodo(newTodo);
}

function addTodo(todo) {
  _todos.push(todo);
}

function updateTodo(todo) {
  TodoAPI.updateTodo(todo);
}

function updateAll(updates) {
  for (var i = 0; i < updates.length; i++) {
    updateTodo(updates[i]);
  }
}

function reorder(todo, from, to) {
  _todos.splice(to, 0, _todos.splice(from,1)[0]);
}

var TodoStore = assign({}, EventEmitter.prototype, {
  
  getTodos: function () {
    return _todos;
  },
  
  setTodos: function (todos) {
    _todos = todos;
  },
  
  remainingItems: function () {
    var remaining = [];
    for (var i = 0; i < _todos.length; i++) {
      if(!_todos[i].done) {
        remaining.push(_todos[i]);
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
    case TodoConstants.SET_TODOS:
      setTodos(payload.data);
      break;
      
    case TodoConstants.CREATE_TODO:
      createTodo(payload.data);
      break;
      
    case TodoConstants.ADD_TODO:
      addTodo(payload.data);
      break;
    
    case TodoConstants.SAVE_TODO:
      updateTodo(payload.data);
      break;
    
    case TodoConstants.COMPLETE_ALL:
      updateAll(payload.data);
      break;
    
    case TodoConstants.REORDER:
      reorder(payload.data.todo, payload.data.from, payload.data.to);
      break;
      
    case TodoConstants.SAVE_TODOS:
      updateAll(payload.data);
      break;
    
    default:
      break;
  }
  
  TodoStore.emitChange();
  
});

module.exports = TodoStore;