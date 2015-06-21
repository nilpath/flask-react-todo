import request from 'superagent';
import TaskActions from '../actions/TaskActions.js';

const BASE_API_URL = 'http://localhost:5000/api/tasks';

export default {
  
  fetchTasks(callback) {
    request
      .get(BASE_API_URL)
      .end((err, res) => {
        if(!err && callback) {
          callback(res.body);
        }
      });
  },
  
  updateTask(task, callback) {
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
  
  createTask(newTask, callback) {
    request
      .post(BASE_API_URL)
      .send(newTask)
      .end((err, res) => {
        if(callback) {
          callback(err, res);
        }
      });
  }
  
};