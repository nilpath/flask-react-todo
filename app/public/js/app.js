import React from 'react';
import TaskAPI from './utils/TaskAPI.js';
import TaskStore from './stores/TaskStore.js';
import TodoApp from './components/TodoApp.js';

window.onload = () => {
  let tasks = document.getElementById('state').innerHTML;
  
  React.render(
    <TodoApp tasks={JSON.parse(tasks)} />, 
    document.getElementById('app')
  );
};
