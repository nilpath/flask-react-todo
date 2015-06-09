jest.dontMock('../public/js/components/NewTask.js');
jest.dontMock('../public/js/actions/TaskActions.js');

var React = require('react/addons'),
    NewTask = require('../public/js/components/NewTask.js'),
    TaskActions = require('../public/js/actions/TaskActions.js'),
    TestUtils = React.addons.TestUtils;

describe('NewTask: ', function () {
  
  function renderComponent() {
    return TestUtils.renderIntoDocument(
      <NewTask />
    );
  }
  
  describe('test input', function () {
    
    it('should update state.description when the value in the input changes', function () {
      var NewTaskElement = renderComponent();
      var newDescription = 'test description';
      var input = TestUtils.findRenderedDOMComponentWithTag(NewTaskElement, 'input');
      TestUtils.Simulate.change(input, {target: {value: newDescription}});
      
      expect(NewTaskElement.state.description).toEqual(newDescription);
    });
    
    it('should include a placeholder', function () {
      var NewTaskElement = renderComponent();
      var input = TestUtils.findRenderedDOMComponentWithTag(NewTaskElement, 'input');
      
      expect(input.getDOMNode().getAttribute('placeholder')).toEqual('What needs to be done?');
    });
    
    it('should include a value equal to state.description', function () {
      var NewTaskElement = renderComponent();
      var input = TestUtils.findRenderedDOMComponentWithTag(NewTaskElement, 'input');
      
      NewTaskElement.setState({
        description: 'test description'
      });
      
      expect(input.getDOMNode().getAttribute('value')).toEqual(NewTaskElement.state.description);
    });
    
  });
  
  describe('add button', function () {
    
    var createTaskSpy;
    
    beforeEach(function (){
      createTaskSpy = spyOn(TaskActions, 'createTask');
    });
    
    it('should not call createTask action if the state.description is empty', function () {
      var NewTaskElement = renderComponent();
      var button = TestUtils.findRenderedDOMComponentWithTag(NewTaskElement, 'button');
      TestUtils.Simulate.click(button);
      
      expect(createTaskSpy).not.toHaveBeenCalled();
      expect(NewTaskElement.state.description).toEqual('');
    });
    
    it('should call createTask action when clicked if the state.description has a value', function () {
      var NewTaskElement = renderComponent();
      var button = TestUtils.findRenderedDOMComponentWithTag(NewTaskElement, 'button');
      var newDescription = 'test description';
      
      NewTaskElement.setState({
        description: newDescription
      });
      TestUtils.Simulate.click(button);
      
      expect(createTaskSpy).toHaveBeenCalledWith({
        description: newDescription
      });
    });
    
    it('should reset state.description when clicked', function () {
      var NewTaskElement = renderComponent();
      var button = TestUtils.findRenderedDOMComponentWithTag(NewTaskElement, 'button');
      var newDescription = 'test description';
      
      NewTaskElement.setState({
        description: newDescription
      });
      TestUtils.Simulate.click(button);
      
      expect(NewTaskElement.state.description).not.toEqual(newDescription);
      expect(NewTaskElement.state.description).toEqual('');
    });
    
  });
  
});