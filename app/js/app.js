window.React = require('react');

var TodoApp = require('./components/TodoApp.js');

React.render(
  <TodoApp />,
  document.getElementById('todo')
);