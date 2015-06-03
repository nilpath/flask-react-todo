var React = require('react');

var Footer = React.createClass({
  
  render: function () {
    
    return (
      <footer>
        <span>2 items left</span>
        <a href="#">Mark all as complete</a>
      </footer>
    );
    
  }
  
});

module.exports = Footer;