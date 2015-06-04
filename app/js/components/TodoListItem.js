var React = require('react');
var cx = require('react/lib/cx');
var ReactPropTypes = React.PropTypes; 
var TodoActions = require('../actions/TodoActions.js');

var TodoListItem = React.createClass({
  
  propTypes: {
    todo: ReactPropTypes.object.isRequired
  },
  
  render: function () {
    var todo = this.props.todo;
    var classes = cx({
      'todo-list__item': true,
      'todo-list__item--done': todo.done
    });
    
    return (
      <li className={classes}>
        <input 
          type="checkbox" 
          id={todo._id}
          className="todo__checkbox"
          checked={todo.done} 
          onChange={this.toggleDone}
        />
        <label htmlFor={todo._id}>{todo.description}</label>
      </li>
    );
    
  },
  
  toggleDone: function () {
    TodoActions.toggleDone(this.props.todo);
  }
  
});

module.exports = TodoListItem;