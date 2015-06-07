var request = require('superagent');
var TaskActions = require('../actions/TaskActions.js');

var ENDPOINTS = {
  LIST_AND_SAVE: 'http://localhost:5000/api/tasks',
  GET_UPDATE_DELETE: 'http://localhost:5000/api/tasks/'
};

module.exports = {
  
  fetchTasks: function () {
    request
      .get(ENDPOINTS.LIST_AND_SAVE)
      .end(function(err, res) {
        if(!err) {
          TaskActions.setTasks(res.body);
        }
      });
  },
  
  updateTask: function (task) {
    var url = [ENDPOINTS.GET_UPDATE_DELETE, task._id].join('');
    request
      .put(url)
      .send(task)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        }
      });  
  },
  
  createTask: function (newTask) {
    request
      .post(ENDPOINTS.LIST_AND_SAVE)
      .send(newTask)
      .end(function(err, res) {
        if(!err) {
          TaskActions.addTask(res.body);
        }
      });
  }
  
};