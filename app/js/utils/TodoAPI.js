var request = require('superagent');
var TodoActions = require('../actions/TodoActions.js');

var ENDPOINTS = {
  LIST_AND_SAVE: 'http://localhost:5000/api/tasks',
  GET_UPDATE_DELETE: 'http://localhost:5000/api/tasks/'
};

module.exports = {
  
  fetchTodos: function () {
    request
      .get(ENDPOINTS.LIST_AND_SAVE)
      .end(function(err, res) {
        if(!err) {
          TodoActions.setTodos(res.body);
        }
      });
  },
  
  updateTodo: function (todo) {
    var url = [ENDPOINTS.GET_UPDATE_DELETE, todo._id].join('');
    request
      .put(url)
      .send(todo)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        }
      });  
  },
  
  saveTodo: function (newTodo) {
    request
      .post(ENDPOINTS.LIST_AND_SAVE)
      .send(newTodo)
      .end(function(err, res) {
        if(!err) {
          TodoActions.addTodo(res.body);
        }
      });
  }
  
};