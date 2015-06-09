jest.dontMock('../public/js/actions/TaskActions.js');
jest.dontMock('../public/js/dispatcher/AppDispatcher.js');
jest.dontMock('../public/js/contants/TaskConstants.js');
jest.dontMock('keymirror');

var TaskActions = require('../public/js/actions/TaskActions.js'),
    AppDispatcher = require('../public/js/dispatcher/AppDispatcher.js'),
    TaskConstants = require('../public/js/contants/TaskConstants.js');
    
describe('TaskActions: ', function () {
  
  var dispatchSpy, tasks;
  
  beforeEach(function () {
    dispatchSpy = spyOn(AppDispatcher, 'dispatch');
    
    tasks = [
      {description: 'test task one', done: false},
      {description: 'test task two', done: false},
      {description: 'test task three', done: false}
    ];
  });
  
  it('#setTasks should dispatch SET_TODOS action', function (){
    TaskActions.setTasks(tasks);
    expect(dispatchSpy).toHaveBeenCalledWith({
      actionType: TaskConstants.SET_TODOS,
      data: tasks
    });
  });
  
  it('#saveTask should dispatch SAVE_TODO action', function (){
    var newTask = {description: 'test description'};
    TaskActions.saveTask(newTask);
    expect(dispatchSpy).toHaveBeenCalledWith({
      actionType: TaskConstants.SAVE_TODO,
      data: newTask
    });
  });
  
  it('#createTask should dispatch CREATE_TODO action', function (){
    var newTask = {description: 'test description'};
    TaskActions.createTask(newTask);
    expect(dispatchSpy).toHaveBeenCalledWith({
      actionType: TaskConstants.CREATE_TODO,
      data: newTask
    });
  });
  
  it('#addTask should dispatch ADD_TODO action', function (){
    TaskActions.addTask(tasks[0]);
    expect(dispatchSpy).toHaveBeenCalledWith({
      actionType: TaskConstants.ADD_TODO,
      data: tasks[0]
    });
  });
  
  it('#reorder should dispatch REORDER action', function (){
    var from = 1;
    var to = 0;
    TaskActions.reorder(tasks[0], from, to);
    expect(dispatchSpy).toHaveBeenCalledWith({
      actionType: TaskConstants.REORDER,
      data: {
        task: tasks[0],
        from: from,
        to: to
      }
    });
  });
  
  it('#saveTasks should dispatch SAVE_TODOS action', function (){
    TaskActions.saveTasks(tasks);
    expect(dispatchSpy).toHaveBeenCalledWith({
      actionType: TaskConstants.SAVE_TODOS,
      data: tasks
    });
  });
  
  describe('#toggleDone', function () {
    
    it('should dispatch SAVE_TODO action', function (){
      TaskActions.toggleDone(tasks[0]);
      expect(dispatchSpy).toHaveBeenCalledWith({
        actionType: TaskConstants.SAVE_TODO,
        data: tasks[0]
      });
    });
    
    it('should toggle task.done false to true', function () {
      tasks[0].done = false;
      TaskActions.toggleDone(tasks[0]);
      expect(tasks[0].done).toEqual(true);
    });
    
    it('should toggle task.done true to false', function () {
      tasks[0].done = true;
      TaskActions.toggleDone(tasks[0]);
      expect(tasks[0].done).toEqual(false);
    });
    
  });
  
  describe('#completeAll', function () {
    
    it('should dispatch SAVE_TODOS action', function (){
      TaskActions.completeAll(tasks);
      expect(dispatchSpy).toHaveBeenCalledWith({
        actionType: TaskConstants.SAVE_TODOS,
        data: tasks
      });
    });
    
    it('should only dispatch tasks that have not been done', function (){
      tasks[1].done = true;
      var unfinishedTasks = [tasks[0], tasks[2]];
      TaskActions.completeAll(tasks);
      expect(dispatchSpy).toHaveBeenCalledWith({
        actionType: TaskConstants.SAVE_TODOS,
        data: unfinishedTasks
      });
    });
    
    it('should toggle task.done false to true', function () {
      TaskActions.completeAll(tasks);
      expect(tasks[0].done).toEqual(true);
      expect(tasks[1].done).toEqual(true);
      expect(tasks[2].done).toEqual(true);
    });
    
  });
  
});