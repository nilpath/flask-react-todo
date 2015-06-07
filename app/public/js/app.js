var react = require('react');
var TaskAPI = require('./utils/TaskAPI.js');
var TaskStore = require('./stores/TaskStore.js');
var TaskApp = react.createFactory(require('./components/TaskApp.js'));
var tasks = document.getElementById('state').innerHTML;

if (typeof window !== "undefined") {
  window.onload = function() {
    react.render(TaskApp({
      tasks: JSON.parse(tasks)
    }), document.getElementById('app'));
  };
}