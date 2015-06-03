var React = require('react');
var TodoListItem = require('./TodoListItem.js');

var TodoList = React.createClass({
  
  render: function () {
    return (
      <ul>
        <TodoListItem />
      </ul>
    );
  }
  
});

module.exports = TodoList;