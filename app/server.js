var express = require('express');
var path = require('path');
var app = express();
var request = require('superagent');
var port = 8001;
var react = require('react');
var bodyParser = require('body-parser');

require('node-jsx').install();

var TodoApp = react.createFactory(require('./public/js/components/TodoApp.js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

function getTasks(cb) {
  if(!cb) { return; }
    
  request
    .get('http://localhost:5000/api/tasks')
    .end(function(err, res) {
      cb(res.body);
    });
    
}

function newTask(task, cb) {
  if(!task) { return; }
  
  request
    .post('http://localhost:5000/api/tasks')
    .send(task)
    .end(function(error){
      if(error) {
        console.log('failed to save new task: ', error);
      }
      if(cb) {
        cb();
      }
    });
}

function updateTask(task, cb) {
  if(!task) { return; }
  
  var url = ['http://localhost:5000/api/tasks/', task._id].join('');
  
  request
    .put(url)
    .send(task)
    .end(function (error) {
      if(error) {
        console.log('failed to update task: ', error);
      }
      if(cb) {
        cb();
      }
    });
}

// routes
app.get('/', function(req, res) {
  
  getTasks(function (tasks) {
    var html = react.renderToString(
      TodoApp({
        tasks: tasks
      })
    );
    
    res.render('index.ejs', {
      app: html,
      state: JSON.stringify(tasks)
    });
  });
  
});

app.post('/tasks/new', function(req, res) {
  var description = req.body.description;
  
  if(description) {
    newTask({description: description}, function() {
      res.redirect('/');
    });
  }
  
});

app.post('/tasks/:id/toggle', function (req, res) {
  var id = req.params.id;
  var done = !!req.body.done;
  var order = Number(req.body.order);
  var description = req.body.description;
  var task = {_id: id, description: description, order: order, done: done};
  
  if(id) {
    updateTask(task, function () {
      res.redirect('/');
    });
  }
});

app.post('/tasks/allDone', function (req, res) {
  
  getTasks(function (tasks) {
    var undone = tasks.filter(function (task) {
      return !tasks.done;
    });
    
    undone.forEach(function (task) {
      task.done = true;
      updateTask(task);
    });
    
    res.redirect('/');
    
  });
  
});

app.listen(port, function(){
  console.log('listening on port: ', port);
});