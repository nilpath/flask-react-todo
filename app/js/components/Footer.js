var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions.js');

var Footer = React.createClass({
  
  propTypes: {
    todos: ReactPropTypes.array.isRequired,
    remainingItems: ReactPropTypes.array.isRequired
  },
  
  render: function () {
    var count = this.props.remainingItems.length;
    var plural = count === 1 ? '' : 's';
    var remainingText = [count, ' item', plural, ' left'].join('');
    
    return (
      <footer>
        <span>{remainingText}</span>
        <button onClick={this.completeAll}>Mark all as complete</button>
      </footer>
    );
    
  },
  
  completeAll: function () {
    TodoActions.completeAll(this.props.todos);
  }
  
});

module.exports = Footer;