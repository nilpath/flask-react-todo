var React = require('react');
var ReactPropTypes = React.PropTypes; 
var NewTask = require('./NewTask.js');
var TaskList = require('./TaskList.js');
var Footer = require('./Footer.js');
var Header = require('./Header.js');
var TaskStore = require('../stores/TaskStore.js');

function getState() {
  return {
    tasks: TaskStore.getTasks(),
    remainingItems: TaskStore.remainingItems()
  };
}

var TaskApp = React.createClass({
  
  propTypes: {
    tasks: ReactPropTypes.array
  },
  
  getInitialState: function () {
    var tasks = this.props.tasks || [];
    TaskStore.setTasks(tasks);
    return getState();
  },
  
  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange);
  },
  
  render: function () {
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
    
  },
  
  _onChange: function() {
    this.setState(getState());
  }
  
});

module.exports = TaskApp;