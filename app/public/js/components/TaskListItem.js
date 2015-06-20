import React from 'react';
import classNames from 'classnames';
import TaskActions from '../actions/TaskActions.js';

const ReactPropTypes = React.PropTypes;

export default React.createClass({
  
  propTypes: {
    task: ReactPropTypes.object.isRequired,
    order: ReactPropTypes.number.isRequired,
    onDragStart: ReactPropTypes.func.isRequired,
    onDragOver: ReactPropTypes.func.isRequired,
    onDragEnd: ReactPropTypes.func.isRequired
  },
  
  render() {
    let task = this.props.task;
    let classes = classNames({
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
  
  _toggleDone() {
    TaskActions.toggleDone(this.props.task);
  }
  
});