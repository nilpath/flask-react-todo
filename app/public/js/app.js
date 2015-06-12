var React = require('react');
var TaskAPI = require('./utils/TaskAPI.js');
var TaskStore = require('./stores/TaskStore.js');
var TodoApp = require('./components/TodoApp.js');

window.onload = function () {
  var tasks = document.getElementById('state').innerHTML;
  
  React.render(
    <TodoApp tasks={JSON.parse(tasks)} />, 
    document.getElementById('app')
  );
};
