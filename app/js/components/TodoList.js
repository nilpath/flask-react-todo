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
    
    var todoList = (<ul className="todo-list">{renderTodoListItems(todos)}</ul>);
    var emptyList = (<div className="todo-list todo-list--empty">Empty</div>);
    var list = todos.length > 0 ? todoList : emptyList;
    
    return (
      list
    );
  }
  
});

module.exports = TodoList;