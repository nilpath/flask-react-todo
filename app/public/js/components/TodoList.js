var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoListItem = require('./TodoListItem.js');
var TodoActions = require('../actions/TodoActions.js');

var TodoList = React.createClass({
  
  propTypes: {
    todos: ReactPropTypes.array.isRequired
  },
  
  getInitialState: function () {
    return {};
  },
  
  setDraggingIndex: function (index) {
    this.setState({draggingIndex: index});
  },
  
  updateTodoOrders: function () {
    var todos = this.props.todos;
    todos.forEach(function(todo, key) {
      todo.order = key;
    });
  },
  
  onDragStart: function (event) {
    var index = Number(event.currentTarget.dataset.id);
    this.setDraggingIndex(index);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', null);
  },
  
  onDragOver: function (event) {
    event.preventDefault();
    var current = event.currentTarget;
    var from = this.state.draggingIndex;
    var to = Number(current.dataset.id);
    
    if((event.clientY - current.offsetTop) > (current.offsetHeight / 2)) to++;
    if(from < to) to--;
    
    if(from !== to) {
      TodoActions.reorder(this.props.todos[from], from, to);
      this.setDraggingIndex(to);
    }
    
  },
  
  onDragEnd: function () {
    this.updateTodoOrders();
    this.setDraggingIndex(undefined);
    TodoActions.saveTodos(this.props.todos);
  },
  
  renderTodoListItems: function (todos) {
    var items = [];
    for (var i = 0; i < todos.length; i++) {
      var isDragging = this.state.draggingIndex === i ? true : false;
      items.push(
        <TodoListItem 
          key={i} 
          todo={todos[i]}
          order={i}
          isDragging={isDragging}
          onDragStart={this.onDragStart}
          onDragOver={this.onDragOver}
          onDragEnd={this.onDragEnd}
        />
      );
    }
    return items;
  },
  
  render: function () {
    var todos = this.props.todos;
    var todoList = (<ol className="todo-list">{this.renderTodoListItems(todos)}</ol>);
    var emptyList = (<div className="todo-list todo-list--empty">Empty</div>);
    var list = todos.length > 0 ? todoList : emptyList;
    
    return (
      list
    );
  }
  
});

module.exports = TodoList;