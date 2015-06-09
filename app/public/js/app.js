var React = require('react');
var TaskAPI = require('./utils/TaskAPI.js');
var TaskStore = require('./stores/TaskStore.js');
var TaskApp = require('./components/TaskApp.js');

window.onload = function () {
  var tasks = document.getElementById('state').innerHTML;
  
  React.render(
    <TaskApp tasks={JSON.parse(tasks)}/>, 
    document.getElementById('app')
  );
};
