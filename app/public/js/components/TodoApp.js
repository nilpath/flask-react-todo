import React from 'react';
import BaseComponent from './BaseComponent.js';
import NewTask from './NewTask.js';
import TaskList from './TaskList.js';
import Footer from './Footer.js';
import Header from './Header.js';
import TaskStore from '../stores/TaskStore.js';

const ReactPropTypes = React.PropTypes; 

function getState() {
  return {
    tasks: TaskStore.getTasks(),
    remainingItems: TaskStore.remainingItems()
  };
}

export default class TodoApp extends BaseComponent {
  
  constructor(props) {
    super(props);
    this._bind(['_onChange']);
    
    let tasks = this.props.tasks || [];
    TaskStore.setTasks(tasks);
    this.state = getState();
  }
  
  componentDidMount() {
    TaskStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TaskStore.removeChangeListener(this._onChange);
  }
  
  render() {
    return (
      <div>
        <Header />
        <NewTask />
        <TaskList tasks={this.state.tasks} />
        <Footer 
          remainingItems={this.state.remainingItems} 
          tasks={this.state.tasks}
        />
      </div>
    );
    
  }
  
  _onChange() {
    this.setState(getState());
  }
  
}

TodoApp.propTypes = {
  tasks: ReactPropTypes.array
};