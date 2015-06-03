var React = require('react');
var NewTodo = require('./NewTodo.js');
var TodoList = require('./TodoList.js');
var Footer = require('./Footer.js');
var Header = require('./Header.js');

var TodoApp = React.createClass({
  
  render: function () {
    
    return (
      <div>
        <Header />
        <NewTodo />
        <TodoList />
        <Footer />
      </div>
    );
    
  },
  
});

module.exports = TodoApp;