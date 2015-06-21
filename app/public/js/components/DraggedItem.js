import React from 'react';
import BaseComponent from './BaseComponent.js';
import classNames from 'classnames';

const ReactPropTypes = React.PropTypes; 

export default class DraggedItem extends BaseComponent {
  
  constructor(props) {
    super(props);
  }
  
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
  }
}

DraggedItem.PropTypes = {
  task: ReactPropTypes.object.isRequired
};