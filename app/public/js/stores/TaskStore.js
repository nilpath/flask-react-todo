import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {EventEmitter} from 'events';
import TaskConstants from '../contants/TaskConstants.js';
import TaskActions from '../actions/TaskActions.js';
import TaskAPI from '../utils/TaskAPI.js';
import assign from 'object-assign';

let _tasks = [];

function setTasks(data) {
  _tasks = data;
}

function createTask(newTask) {
  TaskAPI.createTask(newTask, (err, res) => {
    if(!err) {
      TaskActions.addTask(res.body);
    }
  });
}

function addTask(task) {
  _tasks.push(task);
}

function updateTask(task) {
  TaskAPI.updateTask(task);
}

function updateAll(tasks) {
  tasks.forEach(task => updateTask(task));
}

function reorder(task, from, to) {
  _tasks.splice(to, 0, _tasks.splice(from,1)[0]);
}

let TaskStore = assign({}, EventEmitter.prototype, {
  
  getTasks() {
    return _tasks;
  },
  
  //Stores should in general not have setters.
  //Used for syncing state with server rendered react app. 
  setTasks(tasks) {
    _tasks = tasks;
  },
  
  remainingItems() {
    return _tasks.filter(task => !task.done);
  },
  
  emitChange() {
    this.emit('change');
  },
  
  addChangeListener(callback) {
    this.addListener('change', callback);
  },
  
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
  
});

AppDispatcher.register(payload => {
  switch (payload.actionType) {
    case TaskConstants.SET_TODOS:
      setTasks(payload.data);
      break;
      
    case TaskConstants.CREATE_TODO:
      createTask(payload.data);
      break;
      
    case TaskConstants.ADD_TODO:
      addTask(payload.data);
      break;
    
    case TaskConstants.SAVE_TODO:
      updateTask(payload.data);
      break;
    
    case TaskConstants.COMPLETE_ALL:
      updateAll(payload.data);
      break;
    
    case TaskConstants.REORDER:
      reorder(payload.data.task, payload.data.from, payload.data.to);
      break;
      
    case TaskConstants.SAVE_TODOS:
      updateAll(payload.data);
      break;
    
    default:
      break;
  }
  
  TaskStore.emitChange();
  
});

export default TaskStore;