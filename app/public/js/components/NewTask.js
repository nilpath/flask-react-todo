var React = require('react');
var TaskActions = require('../actions/TaskActions.js');

var NewTask = React.createClass({
  
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
          onChange={this._handleChange} 
        />
        <button className="todo-add__button" onClick={this._addTask} >Add Todo</button>
      </div>
    );
  },
  
  _handleChange: function (event) {
    this.setState({description: event.target.value});
  },
  
  _addTask: function() {
    if(!!this.state.description) {
      TaskActions.createTask({description: this.state.description});
      this.setState(this.getInitialState());
    }
  }
  
});

module.exports = NewTask;