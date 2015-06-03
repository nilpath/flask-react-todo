var React = require('react');

var NewTodo = React.createClass({
  
  render: function () {
    return (
      <div>
        <input type="text" />
        <button>Add Todo</button>
      </div>
    );
  }
  
});

module.exports = NewTodo;