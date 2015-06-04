var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoListItem = require('./TodoListItem.js');

var TodoList = React.createClass({
  
  propTypes: {
    todos: ReactPropTypes.array.isRequired
  },
  
  render: function () {
    var todos = this.props.todos;
    
    function renderTodoListItems(todos) {
      var items = [];
      for (var i = 0; i < todos.length; i++) {
        items.push(<TodoListItem key={i} todo={todos[i]} />);
      }
      return items;
    }
    
    return (
      <ul className="todo-list">{renderTodoListItems(todos)}</ul>
    );
  }
  
});

module.exports = TodoList;