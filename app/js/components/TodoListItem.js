var React = require('react');
var ReactPropTypes = React.PropTypes; 
var TodoActions = require('../actions/TodoActions.js');

var TodoListItem = React.createClass({
  
  propTypes: {
    todo: ReactPropTypes.object.isRequired
  },
  
  render: function () {
    var todo = this.props.todo;
    
    return (
      <li>
        <input 
          type="checkbox" 
          checked={todo.done} 
          onChange={this.toggleDone}
        />
        <label>{todo.description}</label>
      </li>
    );
    
  },
  
  toggleDone: function () {
    TodoActions.toggleDone(this.props.todo);
  }
  
});

module.exports = TodoListItem;