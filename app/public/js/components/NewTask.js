import React from 'react';
import TaskActions from '../actions/TaskActions.js';

export default React.createClass({
  
  getInitialState() {
    return {
      description: ''
    };
  },
  
  render() {
    
    let description = this.state.description;
    
    return (
      <form action="/tasks/new" method="post" className="todo-add">
        <input 
          className="todo-add__input" 
          type="text"
          name="description"
          placeholder="What needs to be done?" 
          value={description} 
          onChange={this._handleChange} 
        />
        <button className="todo-add__button" onClick={this._addTask} >Add Todo</button>
      </form>
    );
  },
  
  _handleChange(event) {
    this.setState({description: event.target.value});
  },
  
  _addTask(event) {
    event.preventDefault();
    if(!!this.state.description) {
      TaskActions.createTask({description: this.state.description});
      this.setState(this.getInitialState());
    }
  }
  
});