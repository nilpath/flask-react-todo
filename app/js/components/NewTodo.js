var React = require('react');
var TodoActions = require('../actions/TodoActions.js');

var NewTodo = React.createClass({
  
  getInitialState: function () {
    return {
      description: ''
    };
  },
  
  render: function () {
    
    var description = this.state.description;
    
    return (
      <div className="todo-add">
        <input 
          className="todo-add__input" 
          type="text"
          placeholder="What needs to be done?" 
          value={description} 
          onChange={this.handleChange} 
        />
        <button className="todo-add__button" onClick={this.addTodo} >Add Todo</button>
      </div>
    );
  },
  
  handleChange: function (event) {
    this.setState({description: event.target.value});
  },
  
  addTodo: function() {
    if(!!this.state.description) {
      TodoActions.saveTodo({description: this.state.description});
      this.setState(this.getInitialState());
    }
  }
  
});

module.exports = NewTodo;