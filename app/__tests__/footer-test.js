jest.dontMock('../public/js/components/BaseComponent.js');
jest.dontMock('../public/js/components/Footer.js');
jest.dontMock('../public/js/actions/TaskActions.js');

var React = require('react/addons'),
    Footer = require('../public/js/components/Footer.js'),
    TaskActions = require('../public/js/actions/TaskActions.js'),
    TestUtils = React.addons.TestUtils;

describe('Footer: ', function () {
  
  var tasks;
  
  beforeEach(function () {
    
    tasks = [
      {description: 'test task one', done: false},
      {description: 'test task two', done: false},
      {description: 'test task three', done: false}
    ];
    
  });
  
  function renderComponent() {
    var remaining = tasks.filter(function(task){ return !task.done; });
    
    return TestUtils.renderIntoDocument(
      <Footer tasks={tasks} remainingItems={remaining} />
    );
  }
  
  it('should show the number of tasks remaining', function () {
    var FooterElement = renderComponent();
    var countSpan = TestUtils.findRenderedDOMComponentWithTag(FooterElement, 'span');
    
    expect(countSpan.getDOMNode().textContent).toEqual('3 items left');
  });
  
  it('should use singular when there is only one task left', function () {
    tasks[0].done = true;
    tasks[1].done = true;
    var FooterElement = renderComponent();
    var countSpan = TestUtils.findRenderedDOMComponentWithTag(FooterElement, 'span');
    
    expect(countSpan.getDOMNode().textContent).toEqual('1 item left');
  });
  
  it('should contain a mark all as complete button', function () {
    var FooterElement = renderComponent();
    var button = TestUtils.findRenderedDOMComponentWithTag(FooterElement, 'button');
    
    expect(button.getDOMNode().textContent).toEqual('Mark all as complete');
  });
  
  it('mark all as complete button should complete all tasks', function () {
    var spy = spyOn(TaskActions, 'completeAll');
    var FooterElement = renderComponent();
    var button = TestUtils.findRenderedDOMComponentWithTag(FooterElement, 'button');
    TestUtils.Simulate.click(button);
    
    expect(spy).toHaveBeenCalled();
  });
  
});