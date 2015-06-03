window.React = require('react');
var TodoAPI = require('./utils/TodoAPI.js');
var TodoApp = require('./components/TodoApp.js');

TodoAPI.fetchTodos();

React.render(
  <TodoApp />,
  document.getElementById('todo')
);