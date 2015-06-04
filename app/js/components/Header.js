var React = require('react');

var Header = React.createClass({
  
  render: function () {
    return (
      <header className="todo-header">
        <h1>Todos</h1>
      </header>
    );
  }
  
});

module.exports = Header;