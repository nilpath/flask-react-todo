jest.dontMock('../public/js/components/TaskList.js');
jest.dontMock('../public/js/components/TaskListItem.js');
jest.dontMock('../public/js/components/DraggedItem.js');
jest.dontMock('../public/js/actions/TaskActions.js');

var React = require('react/addons'),
    TaskList = require('../public/js/components/TaskList.js'),
    DraggedItem = require('../public/js/components/DraggedItem.js'),
    TaskActions = require('../public/js/actions/TaskActions.js'),
    TestUtils = React.addons.TestUtils;

describe('TaskList: ', function () {
  
  var tasks;
  
  beforeEach(function () {
    
    tasks = [
      {description: 'test task one', done: false},
      {description: 'test task two', done: false},
      {description: 'test task three', done: false}
    ];
    
  });
  
  function renderComponent() {
    return TestUtils.renderIntoDocument(
      <TaskList tasks={tasks} />
    );
  }
  
  it('should render a empty list if props.task is empty', function () {
    tasks = [];
    var TaskListElement = renderComponent();
    var emptyList = TestUtils.findRenderedDOMComponentWithTag(TaskListElement, 'div');
    
    expect(emptyList.getDOMNode().textContent).toEqual('Empty');
  });
  
  it('should render the same number of todos that there are props.tasks', function () {
    var TaskListElement = renderComponent();
    var todos = TestUtils.scryRenderedDOMComponentsWithTag(TaskListElement, 'li');
    
    expect(todos.length).toEqual(tasks.length);
  });
  
  it('should render an and DraggedItem if dragging is set on state', function (){
    var TaskListElement = renderComponent();
    TaskListElement.setState({dragging: tasks[0]});
    
    var draggedItem = TestUtils.findRenderedComponentWithType(TaskListElement, DraggedItem);
  });
  
  describe('drag start event', function () {
    
    var event;
    
    beforeEach(function () {
      event = {
        pageX: 1,
        pageY: 2,
        currentTarget: {
          dataset: {id: 1},
          getBoundingClientRect: jasmine.createSpy('getBoundingClientRect').andReturn({
            left: 0,
            top: 0
          })
        },
        dataTransfer: {
          setData: jasmine.createSpy('setData')
        }
      };
    });
    
    it('should set the draggingIndex from the currentTarget data-id', function () {
      var TaskListElement = renderComponent();
      TaskListElement._onDragStart(event);
      
      expect(TaskListElement.state.draggingIndex).toEqual(event.currentTarget.dataset.id);
    });
    
    it('should set the dragging task', function () {
      var TaskListElement = renderComponent();
      TaskListElement._onDragStart(event);
      
      expect(TaskListElement.state.dragging).toBe(tasks[event.currentTarget.dataset.id]);
    });
    
    it('should set the draggingOrigin', function () {
      var TaskListElement = renderComponent();
      TaskListElement._onDragStart(event);
      
      expect(TaskListElement.state.draggingOrigin).toEqual({
        originX: 1,
        originY: 2,
        elementX: 0,
        elementY: 0
      });
    });
    
    it('should set dataTransfer on the event', function () {
      var TaskListElement = renderComponent();
      TaskListElement._onDragStart(event);
      
      expect(event.dataTransfer.effectAllowed).toEqual('move');
      expect(event.dataTransfer.setData).toHaveBeenCalledWith('text/html', null);
    });
    
  });
  
  describe('drag over event', function () {
    var TaskListElement, calculateToSpy, draggingIndexSpy, reorderSpy, event;
    
    beforeEach(function () {
      event = {
        pageY: 4,
        preventDefault: jasmine.createSpy('preventDefault'),
        currentTarget: {
          dataset: {id: 1}
        }
      };
      
      TaskListElement = renderComponent();
      calculateToSpy = spyOn(TaskListElement, '_calculateToIndex').andReturn(2);
      reorderSpy = spyOn(TaskActions, 'reorder');
      draggingIndexSpy = spyOn(TaskListElement, '_setDraggingIndex');
    });
    
    it('should call event.preventDefault', function () {
      TaskListElement._onDragOver(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
    });
    
    it('should set draggingInfo', function () {
      TaskListElement.setState({
        draggingOrigin: {
          elementX: 0,
          elementY: 1,
          originY: 1
        }
      });
      
      TaskListElement._onDragOver(event);
      
      expect(TaskListElement.state.draggingInfo).toEqual({
        left: 0,
        top: 4
      });
    });
    
    it('should trigger a reorder if dragging over a new target', function () {
      TaskListElement.setState({
        draggingIndex: 1
      });
      TaskListElement._onDragOver(event);
      expect(reorderSpy).toHaveBeenCalledWith(tasks[1], 1, 2);
    });
    
    it('should update the draggingIndex', function () {
      TaskListElement._onDragOver(event);
      
      expect(draggingIndexSpy).toHaveBeenCalledWith(2);
    });
    
  });
  
  describe('drag end event', function () {
    
    var saveTodosSpy;
    
    beforeEach(function (){
      saveTodosSpy = spyOn(TaskActions, 'saveTasks');
    });
    
    it('should update each task.order after the index', function () {
      tasks = [
        {order: 1},
        {order: 0}
      ];
      TaskListElement = renderComponent();
      TaskListElement._onDragEnd();
      
      expect(tasks[0].order).toEqual(0);
      expect(tasks[1].order).toEqual(1);
    });
    
    it('should reset state', function () {
      TaskListElement = renderComponent();
      TaskListElement.setState({
        dragging: tasks[0],
        draggingIndex: 0,
        draggingInfo: {
          left: 5,
          top: 5
        },
        draggingOrigin: {
          originX: 7,
          originY: 6,
          elementX: 5,
          elementY: 4
        }
      });
      TaskListElement._onDragEnd();
      expect(TaskListElement.state).toEqual({
        dragging: undefined,
        draggingIndex: undefined,
        draggingInfo: {},
        draggingOrigin: {
          elementX: undefined,
          elementY: undefined,
          originX: undefined,
          originY: undefined
        }
      });
    });
    
  });
  
});