var React = require('react');
var ReactPropTypes = React.PropTypes;
var TaskListItem = require('./TaskListItem.js');
var DraggedItem = require('./DraggedItem.js');
var TaskActions = require('../actions/TaskActions.js');

var TaskList = React.createClass({
  
  propTypes: {
    tasks: ReactPropTypes.array.isRequired
  },
  
  getInitialState: function () {
    return {
      draggingInfo: {},
      draggingOrigin: {}
    };
  },
  
  render: function () {
    var tasks = this.props.tasks;
    var taskList = (<ol className="todo-list">{this._renderTaskListItems(tasks)}</ol>);
    var emptyList = (<div className="todo-list todo-list--empty">Empty</div>);
    var list = tasks.length > 0 ? taskList : emptyList;
    
    return (
      list
    );
  },
  
  _renderTaskListItems: function (tasks) {
    
    function createListItem(task, index) {
      return (
        <TaskListItem 
          key={index} 
          order={index}
          task={task}
          onDragStart={this._onDragStart}
          onDragOver={this._onDragOver}
          onDragEnd={this._onDragEnd}
        />
      );
    }
    
    var items = tasks.map(createListItem.bind(this));
    
    if(this.state.dragging) {
      items.push(
        <DraggedItem 
          key="9999" 
          task={this.state.dragging} 
          draggingInfo={this.state.draggingInfo} 
        />
      );
    }
    
    return items;
  },
  
  _setDraggingIndex: function (index) {
    this.setState({draggingIndex: index});
  },
  
  _setDragging: function (task) {
    this.setState({
      dragging: task
    });
  },
  
  _setDraggingOrigin: function(originX, originY, elementX, elementY) {
    this.setState({
      draggingOrigin: {
        originX: originX,
        originY: originY,
        elementX: elementX,
        elementY: elementY
      }
    });
  },
  
  _setDraggingInfo: function(pageY) {
    var deltaY = pageY - this.state.draggingOrigin.originY;
    
    this.setState({
      draggingInfo: {
        left: this.state.draggingOrigin.elementX,
        top: this.state.draggingOrigin.elementY + deltaY
      }
    });
  },
  
  _updateTaskOrders: function () {
    var tasks = this.props.tasks;
    tasks.forEach(function(task, key) {
      task.order = key;
    });
  },
  
  _calculateToIndex: function(from, event) {
    var current = event.currentTarget;
    var to = Number(current.dataset.id);
    
    if((event.clientY - current.offsetTop) > (current.offsetHeight / 2)) to++;
    if(from < to) to--;
    
    return to;
  },
  
  _onDragStart: function (event) {
    var index = Number(event.currentTarget.dataset.id);
    var rect = event.currentTarget.getBoundingClientRect();
    
    this._setDraggingIndex(index);
    this._setDragging(this.props.tasks[index]);
    this._setDraggingOrigin(event.pageX, event.pageY, rect.left, rect.top);
    
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', null);
    
  },
  
  _onDragOver: function (event) {
    event.preventDefault();
    
    var from = this.state.draggingIndex;
    var to = this._calculateToIndex(from, event); 
    
    this._setDraggingInfo(event.pageY);
    
    if(from !== to) {
      TaskActions.reorder(this.props.tasks[from], from, to);
      this._setDraggingIndex(to);
    }
    
  },
  
  _onDragEnd: function () {
    this._updateTaskOrders();
    this._setDraggingIndex(undefined);
    this._setDraggingOrigin(); //undefined
    this._setDragging(undefined);
    this.setState({
      draggingInfo: {}
    });
    TaskActions.saveTasks(this.props.tasks);
  },
  
});

module.exports = TaskList;