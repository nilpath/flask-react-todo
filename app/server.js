import express from 'express';
import path from 'path';
import request from 'superagent';
import react from 'react';
import todoapp from './public/js/components/TodoApp.js';
import bodyParser from 'body-parser';

let port = 8001;
let app = express();
let TodoApp = react.createFactory(todoapp);
const BASE_API_URL = 'http://localhost:5000/api/tasks';

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
    .get(BASE_API_URL)
    .end((err, res) => {
      if(!err) {
        cb(res.body);
      }
    });
    
}

function newTask(task, cb) {
  if(!task) { return; }
  
  request
    .post(BASE_API_URL)
    .send(task)
    .end(error => {
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
  
  let url = `${BASE_API_URL}/${task._id}`;
  
  request
    .put(url)
    .send(task)
    .end(error => {
      if(error) {
        console.log('failed to update task: ', error);
      }
      if(cb) {
        cb();
      }
    });
}

// routes
app.get('/', (req, res) => {
  
  getTasks(tasks => {
    let html = react.renderToString(
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

app.post('/tasks/new', (req, res) => {
  let description = req.body.description;
  
  if(description) {
    newTask({description: description}, () => res.redirect('/') );
  }
  
});

app.post('/tasks/:id/toggle', (req, res) => {
  let id = req.params.id;
  let done = !!req.body.done;
  let order = Number(req.body.order);
  let description = req.body.description;
  let task = {_id: id, description: description, order: order, done: done};
  
  if(id) {
    updateTask(task, () => res.redirect('/'));
  }
});

app.post('/tasks/allDone', (req, res) => {
  
  getTasks(tasks => {
    let undone = tasks.filter(task => !tasks.done );
    
    undone.forEach(task => {
      task.done = true;
      updateTask(task);
    });
    
    res.redirect('/');
    
  });
  
});

app.listen(port, () => console.log('listening on port: ', port));