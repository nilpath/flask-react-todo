var express = require('express');
var path = require('path');
var app = express();
var request = require('superagent');
var port = 8001;
var react = require('react');
var bodyParser = require('body-parser');

require('node-jsx').install();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var TodoApp = react.createFactory(require('./public/js/components/TodoApp.js'));

app.get('/', function(req, res) {
  
  request
    .get('http://localhost:5000/api/tasks')
    .end(function(err, todoRes) {
      
      var html = react.renderToString(
        TodoApp({
          todos: todoRes.body
        })
      );
      
      res.render('index.ejs', {
        app: html,
        state: JSON.stringify(todoRes.body)
      });
    });
  
});

app.listen(port);