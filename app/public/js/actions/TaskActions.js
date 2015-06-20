import AppDispatcher from '../dispatcher/AppDispatcher.js';
import TaskConstants from '../contants/TaskConstants.js';

export default {
  
  setTasks(tasks) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.SET_TODOS,
      data: tasks
    });
  },
  
  saveTask(newTask) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODO,
      data: newTask
    });
  },
  
  createTask(newTask) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.CREATE_TODO,
      data: newTask
    });
  },
  
  addTask(task) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.ADD_TODO,
      data: task
    });
  },
  
  reorder(task, from, to) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.REORDER,
      data: {
        task: task,
        from: from,
        to: to
      }
    });
  },
  
  saveTasks(tasks) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODOS,
      data: tasks
    });
  },
  
  toggleDone(task) {
    task.done = !task.done;
    
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODO,
      data: task
    });
  },
  
  completeAll(tasks) {
    
    let toUpdate = tasks
      .filter(task => !task.done)
      .map(task => {
        task.done = true;
        return task;
      });
    
    AppDispatcher.dispatch({
      actionType: TaskConstants.SAVE_TODOS,
      data: toUpdate
    });
  }
  
};