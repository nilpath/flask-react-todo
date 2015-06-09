jest.dontMock('../public/js/components/TaskListItem.js');
jest.dontMock('../public/js/actions/TaskActions.js');
jest.dontMock('classnames');

var React = require('react/addons'),
    TaskListItem = require('../public/js/components/TaskListItem.js'),
    TaskActions = require('../public/js/actions/TaskActions.js'),
    TestUtils = React.addons.TestUtils;
    

describe('TaskListItem: ', function () {
  
  var task, order, onDragStartFn, onDragOverFn, onDragEndFn;
  
  beforeEach(function() {
    task = {
      _id: 'asd123',
      description: 'test task one',
      done: false,
      order: 1
    };
    
    order = 0;
    onDragStartFn = jasmine.createSpy('onDragStartFn');
    onDragOverFn = jasmine.createSpy('onDragOverFn');
    onDragEndFn = jasmine.createSpy('onDragEndFn');
  });
  
  function renderComponent() {
    
    return TestUtils.renderIntoDocument(
      <TaskListItem 
        task={task} 
        order={order} 
        onDragStart={onDragStartFn}
        onDragOver={onDragOverFn}
        onDragEnd={onDragEndFn}
      />
    );
  }
  
  it('should render a li element that data-id equal to props.order', function() {
    var TaskListItemElement = renderComponent();
    var li = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'li');
    
    expect(Number(li.getDOMNode().getAttribute('data-id'))).toEqual(order);
  });
  
  it('should add class not todo-list__item--done when task.done is false', function () {
    var TaskListItemElement = renderComponent();
    var li = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'li');
    
    expect(li.getDOMNode().className).not.toMatch('todo-list__item--done');
  });
  
  it('should add class todo-list__item--done when a task is done', function () {
    task.done = true;
    var TaskListItemElement = renderComponent();
    var li = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'li');
    
    expect(li.getDOMNode().className).toMatch('todo-list__item--done');
  });
  
  it('should contain a label with the task description', function() {
    var TaskListItemElement = renderComponent();
    var label = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'label');
    
    expect(label.getDOMNode().textContent).toEqual(task.description);
  });
  
  describe('draggable', function () {
    
    it('should render a li element that is draggable', function () {
      var TaskListItemElement = renderComponent();
      var li = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'li');
      
      expect(li.getDOMNode().getAttribute('draggable')).toBeTruthy();
    });
    
    it('should call onDragStart prop when responding to drag start event', function() {
      var TaskListItemElement = renderComponent();
      var li = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'li');
      TestUtils.Simulate.dragStart(li);
      
      expect(onDragStartFn).toHaveBeenCalled();
    });
    
    it('should call onDragOver prop when responding to drag over event', function() {
      var TaskListItemElement = renderComponent();
      var li = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'li');
      TestUtils.Simulate.dragOver(li);
      
      expect(onDragOverFn).toHaveBeenCalled();
    });
    
    it('should call onDragEnd prop when responding to drag end event', function() {
      var TaskListItemElement = renderComponent();
      var li = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'li');
      TestUtils.Simulate.dragEnd(li);
      
      expect(onDragEndFn).toHaveBeenCalled();
    });
    
  });
  
  describe('checkbox ', function () {
    
    it('should not be checked if the task.done is false', function() {
      var TaskListItemElement = renderComponent();
      var checkbox = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'input');
      
      expect(checkbox.getDOMNode().getAttribute('checked')).toEqual(null);
    });
    
    it('should be checked if the task is done', function() {
      task.done = true;
      var TaskListItemElement = renderComponent();
      var checkbox = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'input');
      
      expect(checkbox.getDOMNode().getAttribute('checked')).toEqual('');
    });
    
    it('should call TaskAction toggleDone when changing state', function() {
      var spy = spyOn(TaskActions, 'toggleDone');
      var TaskListItemElement = renderComponent();
      var checkbox = TestUtils.findRenderedDOMComponentWithTag(TaskListItemElement, 'input');
      TestUtils.Simulate.change(checkbox);
      
      expect(spy).toHaveBeenCalled();
    });
    
    
    
  });
  
});