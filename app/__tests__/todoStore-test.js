jest.dontMock('../public/js/contants/TaskConstants.js');
jest.dontMock('../public/js/stores/TaskStore.js');
jest.dontMock('../public/js/utils/TaskAPI.js');
jest.dontMock('object-assign');
jest.dontMock('keymirror');

var TaskConstants = require('../public/js/contants/TaskConstants.js');
var AppDispatcher;
var TaskStore;
var TaskAPI;
var callback;
var tasks;
var mockActions;

function setMockActions(tasks) {
  return {
    setTodosAction: {
      actionType: TaskConstants.SET_TODOS,
      data: tasks
    },
    createTodoAction: {
      actionType: TaskConstants.CREATE_TODO,
      data: {description: 'test description'}
    },
    addTodoAction: {
      actionType: TaskConstants.ADD_TODO,
      data: tasks[0]
    },
    saveTodoAction: {
      actionType: TaskConstants.SAVE_TODO,
      data: tasks[0]
    },
    saveTodosAction: {
      actionType: TaskConstants.SAVE_TODOS,
      data: tasks
    },
    completeAllAction: {
      actionType: TaskConstants.COMPLETE_ALL,
      data: tasks
    },
    reorderAction: {
      actionType: TaskConstants.REORDER,
      data: {
        task: tasks[0],
        from: 0,
        to: 2
      }
    }
  };
}

describe('TaskStore: ', function () {
  
  beforeEach(function () {
    AppDispatcher = require('../public/js/dispatcher/AppDispatcher.js');
    TaskStore = require('../public/js/stores/TaskStore.js');
    TaskAPI = require('../public/js/utils/TaskAPI.js');
    callback = AppDispatcher.register.mock.calls[0][0];
    
    tasks = [
      {description: 'test task one', done: false},
      {description: 'test task two', done: false},
      {description: 'test task three', done: false}
    ];
    
    mockActions = setMockActions(tasks);
  });
  
  it('registers a callback with the AppDispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toEqual(1);
  });
  
  it('should init without any tasks', function () {
    var tasks = TaskStore.getTasks();
    expect(tasks).toEqual([]);
  });
  
  it('#setTasks should update the tasks', function() {
    TaskStore.setTasks(tasks);
    var updatedTasks = TaskStore.getTasks();
    expect(updatedTasks).toEqual(tasks); 
  });
  
  it('#remainingItems should return the tasks that have done set as false', function () {
    tasks[1].done = true;
    TaskStore.setTasks(tasks);
    var remaining = TaskStore.remainingItems();
    expect(remaining).toEqual([tasks[0], tasks[2]]);
  });
  
  it('should update tasks when responding to SET_TODOS action', function () {
    callback(mockActions.setTodosAction);
    var updatedTasks = TaskStore.getTasks();
    expect(updatedTasks).toEqual(tasks);
  });
  
  it('should call the server when responding to CREATE_TODO action', function () {
    var createTaskSpy = spyOn(TaskAPI, 'createTask');
    callback(mockActions.createTodoAction);
    expect(createTaskSpy).toHaveBeenCalledWith(mockActions.createTodoAction.data);
  });
  
  it('should update the tasks list with a new task when responding to ADD_TODO', function () {
    callback(mockActions.addTodoAction);
    var updatedTasks = TaskStore.getTasks();
    expect(updatedTasks).toEqual([tasks[0]]);
  });
  
  it('should call the server when responding to SAVE_TODO action', function() {
    var updateTaskSpy = spyOn(TaskAPI, 'updateTask');
    callback(mockActions.saveTodoAction);
    expect(updateTaskSpy).toHaveBeenCalledWith(mockActions.saveTodoAction.data);
  });
  
  it('should call the server once for each task when responding to COMPLETE_ALL action', function() {
    var updateTaskSpy = spyOn(TaskAPI, 'updateTask');
    callback(mockActions.completeAllAction);
    expect(updateTaskSpy).toHaveBeenCalled();
    expect(updateTaskSpy.callCount).toEqual(mockActions.completeAllAction.data.length);
  });
  
  it('should call the server once for each task when responding to SAVE_TODOS action', function () {
    var updateTaskSpy = spyOn(TaskAPI, 'updateTask');
    callback(mockActions.saveTodosAction);
    expect(updateTaskSpy).toHaveBeenCalled();
    expect(updateTaskSpy.callCount).toEqual(mockActions.saveTodosAction.data.length);
  });
  
  it('should reorder the tasks when responding to REORDER action', function() {
    TaskStore.setTasks(tasks);
    callback(mockActions.reorderAction);
    var updatedTasks = TaskStore.getTasks();
    expect(updatedTasks[0].description).toEqual('test task two');
    expect(updatedTasks[1].description).toEqual('test task three');
    expect(updatedTasks[2].description).toEqual('test task one');
  });
  
});