import React from 'react';
import TaskActions from '../actions/TaskActions.js';

const ReactPropTypes = React.PropTypes;

export default React.createClass({
  
  propTypes: {
    tasks: ReactPropTypes.array.isRequired,
    remainingItems: ReactPropTypes.array.isRequired
  },
  
  render() {
    let count = this.props.remainingItems.length;
    let plural = count === 1 ? '' : 's';
    let remainingText = `${count} item${plural} left`;
    
    return (
      <footer className="todo-footer">
        <form action="/tasks/allDone" method="post">
          <span>{remainingText}</span>
          <button className="todo-footer__link todo--right" onClick={this._completeAll}>Mark all as complete</button>
        </form>
      </footer>
    );
    
  },
  
  _completeAll(event) {
    event.preventDefault();
    TaskActions.completeAll(this.props.tasks);
  }
  
});