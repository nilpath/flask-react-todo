var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TodoConstants = require('../contants/TodoConstants.js');

var TodoActions = {
  
  setTodos: function (data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.SET_TODOS,
      data: data
    });
  },
  
  saveTodo: function (newTodo) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.SAVE_TODO,
      data: newTodo
    });
  },
  
  addTodo: function (todo) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.ADD_TODO,
      data: todo
    });
  },
  
  reorder: function (todo, from, to) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.REORDER,
      data: {
        todo: todo,
        from: from,
        to: to
      }
    });
  },
  
  saveTodos: function (todos) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.SAVE_TODOS,
      data: todos
    });
  },
  
  toggleDone: function (todo) {
    todo.done = !todo.done;
    
    AppDispatcher.dispatch({
      actionType: TodoConstants.SAVE_TODO,
      data: todo
    });
  },
  
  completeAll: function (todos) {
    var toUpdate = [];
    for(var i = 0; i < todos.length; i++) {
      if(!todos[i].done) {
        todos[i].done = true;
        toUpdate.push(todos[i]);
      }
    }
    
    AppDispatcher.dispatch({
      actionType: TodoConstants.SAVE_TODOS,
      data: toUpdate
    });
  }
  
};


module.exports = TodoActions;