var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TaskConstants = require('../contants/TaskConstants.js');

var TaskActions = {
  
  setTasks: function (data) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.SET_TODOS,
      data: data
    });
  },
  
  saveTask: function (newTask) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODO,
      data: newTask
    });
  },
  
  addTask: function (task) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.ADD_TODO,
      data: task
    });
  },
  
  reorder: function (task, from, to) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.REORDER,
      data: {
        task: task,
        from: from,
        to: to
      }
    });
  },
  
  saveTasks: function (tasks) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODOS,
      data: tasks
    });
  },
  
  toggleDone: function (task) {
    task.done = !task.done;
    
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODO,
      data: task
    });
  },
  
  completeAll: function (tasks) {
    var toUpdate = [];
    for(var i = 0; i < tasks.length; i++) {
      if(!tasks[i].done) {
        tasks[i].done = true;
        toUpdate.push(tasks[i]);
      }
    }
    
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODOS,
      data: toUpdate
    });
  }
  
};


module.exports = TaskActions;