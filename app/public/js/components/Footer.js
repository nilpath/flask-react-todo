var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskActions = require('../actions/TaskActions.js');

var Footer = React.createClass({
  
  propTypes: {
    tasks: ReactPropTypes.array.isRequired,
    remainingItems: ReactPropTypes.array.isRequired
  },
  
  render: function () {
    var count = this.props.remainingItems.length;
    var plural = count === 1 ? '' : 's';
    var remainingText = [count, ' item', plural, ' left'].join('');
    
    return (
      <footer className="todo-footer">
        <span>{remainingText}</span>
        <button className="todo-footer__link todo--right" onClick={this._completeAll}>Mark all as complete</button>
      </footer>
    );
    
  },
  
  _completeAll: function () {
    TaskActions.completeAll(this.props.tasks);
  }
  
});

module.exports = Footer;