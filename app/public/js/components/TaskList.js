import React from 'react';
import TaskListItem from './TaskListItem.js';
import DraggedItem from './DraggedItem.js';
import TaskActions from '../actions/TaskActions.js';

const ReactPropTypes = React.PropTypes;

export default React.createClass({
  
  propTypes: {
    tasks: ReactPropTypes.array.isRequired
  },
  
  getInitialState() {
    return {
      draggingInfo: {},
      draggingOrigin: {}
    };
  },
  
  render() {
    let tasks = this.props.tasks;
    let taskList = (<ol className="todo-list">{this._renderTaskListItems(tasks)}</ol>);
    let emptyList = (<div className="todo-list todo-list--empty">Empty</div>);
    let list = tasks.length > 0 ? taskList : emptyList;
    
    return (
      list
    );
  },
  
  _renderTaskListItems(tasks) {
    let dragStart = this._onDragStart;
    let dragOver = this._onDragOver;
    let dragEnd = this._onDragEnd;
    
    let items = tasks.map((task, index) => {
      return (
        <TaskListItem 
          key={index} 
          order={index}
          task={task}
          onDragStart={dragStart}
          onDragOver={dragOver}
          onDragEnd={dragEnd}
        />
      );
    });
    
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
  
  _setDraggingIndex(index) {
    this.setState({draggingIndex: index});
  },
  
  _setDragging(task) {
    this.setState({
      dragging: task
    });
  },
  
  _setDraggingOrigin(originX, originY, elementX, elementY) {
    this.setState({
      draggingOrigin: {
        originX: originX,
        originY: originY,
        elementX: elementX,
        elementY: elementY
      }
    });
  },
  
  _setDraggingInfo(pageY) {
    let deltaY = pageY - this.state.draggingOrigin.originY;
    
    this.setState({
      draggingInfo: {
        left: this.state.draggingOrigin.elementX,
        top: this.state.draggingOrigin.elementY + deltaY + document.body.scrollTop
      }
    });
  },
  
  _updateTaskOrders() {
    let tasks = this.props.tasks;
    tasks.forEach(function(task, key) {
      task.order = key;
    });
  },
  
  _calculateToIndex(from, event) {
    let current = event.currentTarget;
    let to = Number(current.dataset.id);
    
    if((event.clientY - current.offsetTop) > (current.offsetHeight / 2)) to++;
    if(from < to) to--;
    
    return to;
  },
  
  _onDragStart(event) {
    let index = Number(event.currentTarget.dataset.id);
    let rect = event.currentTarget.getBoundingClientRect();
    
    this._setDraggingIndex(index);
    this._setDragging(this.props.tasks[index]);
    this._setDraggingOrigin(event.pageX, event.pageY, rect.left, rect.top);
    
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', null);
    
  },
  
  _onDragOver(event) {
    event.preventDefault();
    
    let from = this.state.draggingIndex;
    let to = this._calculateToIndex(from, event); 
    
    this._setDraggingInfo(event.pageY);
    
    if(from !== to) {
      TaskActions.reorder(this.props.tasks[from], from, to);
      this._setDraggingIndex(to);
    }
    
  },
  
  _onDragEnd() {
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