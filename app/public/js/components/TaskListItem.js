var React = require('react');
var classNames = require('classnames');
var ReactPropTypes = React.PropTypes; 
var TaskActions = require('../actions/TaskActions.js');

var TaskListItem = React.createClass({
  
  propTypes: {
    task: ReactPropTypes.object.isRequired,
    order: ReactPropTypes.number.isRequired
  },
  
  getInitialState: function () {
    return {
      task: this.props.task
    };
  },
  
  render: function () {
    var task = this.props.task;
    var isDragging = this.props.isDragging;
    var classes = classNames({
      'todo-list__item': true,
      'todo-list__item--dragging': isDragging,
      'todo-list__item--done': task.done
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
          className="todo__checkbox"
          type="checkbox" 
          id={task._id}
          checked={task.done} 
          onChange={this._toggleDone}
        />
        <label htmlFor={task._id}>{task.description}</label>
      </li>
    );
    
  },
  
  _toggleDone: function () {
    TaskActions.toggleDone(this.props.task);
  }
  
});

module.exports = TaskListItem;