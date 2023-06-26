const express = require('express')
const router = express.Router();
const {newTask,getMyTask, updateTask, deleteTask} = require('../controllers/taskController');
const isAuthenticated = require('../middlewares/auth');
  
router.post('/new', isAuthenticated ,newTask)
router.get('/my', isAuthenticated , getMyTask )
router.route('/:id').put(updateTask).delete(deleteTask)

module.exports = router