var express = require('express');
var path = require('path');
var app = express();
var request = require('superagent');
var port = 8001;
var react = require('react');
var bodyParser = require('body-parser');

require('node-jsx').install();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var TodoApp = react.createFactory(require('./public/js/components/TodoApp.js'));

app.get('/', function(req, res) {
  
  request
    .get('http://localhost:5000/api/tasks')
    .end(function(err, taskRes) {
      
      var html = react.renderToString(
        TodoApp({
          tasks: taskRes.body
        })
      );
      
      res.render('index.ejs', {
        app: html,
        state: JSON.stringify(taskRes.body)
      });
    });
  
});

app.post('/tasks/new', function(req, res) {
  var description = req.body.description;
  
  if(description) {
    request
      .post('http://localhost:5000/api/tasks')
      .send({description: description})
      .end(function(error){
        if(error) {
          console.log('failed to save new task: ', error);
        }
        res.redirect('/');
      });
  }
  
});

app.post('/tasks/:id/toggle', function (req, res) {
  var id = req.params.id;
  var done = !!req.body.done;
  var order = Number(req.body.order);
  var description = req.body.description;
  var url = ['http://localhost:5000/api/tasks/', id].join('');
  
  if(id) {
    request
      .put(url)
      .send({done: done, description: description, order: order})
      .end(function (error) {
        if(error) {
          console.log('failed to update task: ', error);
        }
        res.redirect('/');
      });
  }
});

app.listen(port, function(){
  console.log('listening on port: ', port);
});