var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../contants/TodoConstants.js');
var TodoAPI = require('../utils/TodoAPI.js');
var assign = require('object-assign');

var todos = [];

function setTodos(data) {
  todos = data;
}

function saveTodo(newTodo) {
  TodoAPI.saveTodo(newTodo);
}

function addTodo(todo) {
  todos.push(todo);
}

function updateTodo(todo) {
  TodoAPI.updateTodo(todo);
}

function completeAll(updates) {
  for (var i = 0; i < updates.length; i++) {
    updateTodo(updates[i]);
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {
  
  getTodos: function () {
    return todos;
  },
  
  remainingItems: function () {
    var remaining = [];
    for (var i = 0; i < todos.length; i++) {
      if(!todos[i].done) {
        remaining.push(todos[i]);
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
      
    case TodoConstants.SAVE_TODO:
      saveTodo(payload.data);
      break;
      
    case TodoConstants.ADD_TODO:
      addTodo(payload.data);
      break;
    
    case TodoConstants.UPDATE_TODO:
      updateTodo(payload.data);
      break;
    
    case TodoConstants.COMPLETE_ALL:
      completeAll(payload.data);
      break;
    
    default:
      break;
  }
  
  TodoStore.emitChange();
  
});

module.exports = TodoStore;