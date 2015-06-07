var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskListItem = require('./TaskListItem.js');
var TaskActions = require('../actions/TaskActions.js');

var TaskList = React.createClass({
  
  propTypes: {
    tasks: ReactPropTypes.array.isRequired
  },
  
  getInitialState: function () {
    return {};
  },
  
  setDraggingIndex: function (index) {
    this.setState({draggingIndex: index});
  },
  
  updateTaskOrders: function () {
    var tasks = this.props.tasks;
    tasks.forEach(function(task, key) {
      task.order = key;
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
      TaskActions.reorder(this.props.tasks[from], from, to);
      this.setDraggingIndex(to);
    }
    
  },
  
  onDragEnd: function () {
    this.updateTaskOrders();
    this.setDraggingIndex(undefined);
    TaskActions.saveTasks(this.props.tasks);
  },
  
  renderTaskListItems: function (tasks) {
    var items = [];
    for (var i = 0; i < tasks.length; i++) {
      var isDragging = this.state.draggingIndex === i ? true : false;
      items.push(
        <TaskListItem 
          key={i} 
          task={tasks[i]}
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
    var tasks = this.props.tasks;
    var taskList = (<ol className="todo-list">{this.renderTaskListItems(tasks)}</ol>);
    var emptyList = (<div className="todo-list todo-list--empty">Empty</div>);
    var list = tasks.length > 0 ? taskList : emptyList;
    
    return (
      list
    );
  }
  
});

module.exports = TaskList;