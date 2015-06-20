import React from 'react';
import classNames from 'classnames';

const ReactPropTypes = React.PropTypes; 

export default React.createClass({
  PropTypes: {
    task: ReactPropTypes.object.isRequired
  },
  
  render() {
    let classes = classNames({
      'todo-list__item': true,
      'todo-list__item--dragging': true,
      'todo-list__item--done': this.props.task.done
    });
    
    let styles = {
      position: 'absolute',
      top: this.props.draggingInfo.top,
      left: this.props.draggingInfo.left
    };
    
    return (
      <li className={classes} style={styles}>
        <input checked={this.props.task.done}  className="todo__checkbox" type="checkbox" />
        <label>{this.props.task.description}</label>
      </li>
    );
  },
});