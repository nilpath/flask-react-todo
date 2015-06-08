var React = require('react');
var classNames = require('classnames');
var ReactPropTypes = React.PropTypes; 

var DraggedItem = React.createClass({
  PropTypes: {
    task: ReactPropTypes.object.isRequired
  },
  
  render: function () {
    var classes = classNames({
      'todo-list__item': true,
      'todo-list__item--dragging': true,
      'todo-list__item--done': this.props.task.done
    });
    
    var styles = {};
    styles.position = 'absolute';
    styles.top = this.props.draggingInfo.top;
    styles.left = this.props.draggingInfo.left;
    
    return (
      <li className={classes} style={styles}>
        <input checked={this.props.task.done}  className="todo__checkbox" type="checkbox" />
        <label>{this.props.task.description}</label>
      </li>
    );
  },
});

module.exports = DraggedItem;