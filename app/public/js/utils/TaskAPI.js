import request from 'superagent';
import TaskActions from '../actions/TaskActions.js';

const BASE_API_URL = 'http://localhost:5000/api/tasks';

export default {
  
  fetchTasks() {
    request
      .get(BASE_API_URL)
      .end((err, res) => {
        if(!err) {
          TaskActions.setTasks(res.body);
        }
      });
  },
  
  updateTask(task) {
    let url = `${BASE_API_URL}/${task._id}`;
    request
      .put(url)
      .send(task)
      .end((err, res) => {
        if(err) {
          console.log(err);
        }
      });  
  },
  
  createTask(newTask) {
    request
      .post(BASE_API_URL)
      .send(newTask)
      .end((err, res) => {
        if(!err) {
          TaskActions.addTask(res.body);
        }
      });
  }
  
};