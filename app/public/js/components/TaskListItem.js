var React = require('react');
var classNames = require('classnames');
var ReactPropTypes = React.PropTypes; 
var TaskActions = require('../actions/TaskActions.js');

var TaskListItem = React.createClass({
  
  propTypes: {
    task: ReactPropTypes.object.isRequired,
    order: ReactPropTypes.number.isRequired,
    onDragStart: ReactPropTypes.func.isRequired,
    onDragOver: ReactPropTypes.func.isRequired,
    onDragEnd: ReactPropTypes.func.isRequired
  },
  
  render: function () {
    var task = this.props.task;
    var path = ['/tasks/', task._id, '/toggle'].join('');
    var classes = classNames({
      'todo-list__item': true,
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
        <form action={path} method="post" onSubmit={this._preventButtonClick}>
          <button>
            <input 
              className="todo__checkbox"
              name="done"
              type="checkbox" 
              id={task._id}
              checked={task.done} 
              onChange={this._toggleDone}
            />
            <label htmlFor={task._id}>{task.description}</label>
          </button>
          <input type="hidden" name="order" value={task.order} />
          <input type="hidden" name="description" value={task.description} />
        </form>
      </li>
    );
    
  },
  
  _toggleDone: function () {
    TaskActions.toggleDone(this.props.task);
  },
  
  _preventButtonClick: function (event) {
    event.preventDefault();
  }
  
});

module.exports = TaskListItem;