import express from 'express';
import path from 'path';
import request from 'superagent';
import react from 'react';
import TaskAPI from './public/js/utils/TaskAPI.js';
import todoapp from './public/js/components/TodoApp.js';
import bodyParser from 'body-parser';

let port = 8001;
let app = express();
let TodoApp = react.createFactory(todoapp);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  
  TaskAPI.fetchTasks(tasks => {
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
    let task = {description};
    TaskAPI.createTask(task, () => res.redirect('/'));
  }
  
});

app.post('/tasks/:id/toggle', (req, res) => {
  let _id = req.params.id;
  let done = !!req.body.done;
  let order = Number(req.body.order);
  let description = req.body.description;
  let task = {_id, description, order, done};
  
  if(_id) {
    TaskAPI.updateTask(task, () => res.redirect('/'));
  }
});

app.post('/tasks/allDone', (req, res) => {
  
  TaskAPI.fetchTasks(tasks => {
    let undone = tasks.filter(task => !tasks.done );
    
    undone.forEach(task => {
      task.done = true;
      TaskAPI.updateTask(task);
    });
    
    res.redirect('/');
    
  });
  
});

app.listen(port, () => console.log('listening on port: ', port));