var React = require('react');
var NewTodo = require('./NewTodo.js');
var TodoList = require('./TodoList.js');
var Footer = require('./Footer.js');
var Header = require('./Header.js');
var TodoStore = require('../stores/TodoStore.js');

function getState() {
  return {
    todos: TodoStore.getTodos(),
    remainingItems: TodoStore.remainingItems()
  };
}

var TodoApp = React.createClass({
  
  getInitialState: function () {
    return getState();
  },
  
  componentDidMount: function() {
    TodoStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this.onChange);
  },
  
  render: function () {
    return (
      <div>
        <Header />
        <NewTodo />
        <TodoList todos={this.state.todos} />
        <Footer remainingItems={this.state.remainingItems} todos={this.state.todos}/>
      </div>
    );
    
  },
  
  onChange: function() {
    this.setState(getState());
  }
  
});

module.exports = TodoApp;