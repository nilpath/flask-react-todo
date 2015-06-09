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
  
  createTask: function (newTask) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.CREATE_TODO,
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
    
    function notDone(task) {
      return !task.done;
    }
    
    var toUpdate = tasks
      .filter(notDone)
      .map(function(task){
        task.done = true;
        return task;
      });
    
    
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODOS,
      data: toUpdate
    });
  }
  
};


module.exports = TaskActions;