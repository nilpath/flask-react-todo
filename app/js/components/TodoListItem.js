var React = require('react');
var cx = require('react/lib/cx');
var ReactPropTypes = React.PropTypes; 
var TodoActions = require('../actions/TodoActions.js');

var TodoListItem = React.createClass({
  
  propTypes: {
    todo: ReactPropTypes.object.isRequired,
    order: ReactPropTypes.number.isRequired
  },
  
  getInitialState: function () {
    return {
      todo: this.props.todo
    };
  },
  
  render: function () {
    var todo = this.props.todo;
    var isDragging = this.props.isDragging;
    var classes = cx({
      'todo-list__item': true,
      'todo-list__item--dragging': isDragging,
      'todo-list__item--done': todo.done
    });
    
    return (
      <li 
        className={classes} 
        data-id={this.props.order} 
        draggable="true"
        onDragStart={this.props.onDragStart}
        onDragOver={this.props.onDragOver}
        onDragEnd={this.props.onDragEnd}
      >
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