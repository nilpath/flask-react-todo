var react = require('react');
var TodoAPI = require('./utils/TodoAPI.js');
var TodoStore = require('./stores/TodoStore.js');
var TodoApp = react.createFactory(require('./components/TodoApp.js'));
var todos = document.getElementById('state').innerHTML;

if (typeof window !== "undefined") {
  window.onload = function() {
    react.render(TodoApp({
      todos: JSON.parse(todos)
    }), document.getElementById('app'));
  };
}