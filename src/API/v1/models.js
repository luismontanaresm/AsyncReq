const mongoose = require('mongoose');
let environ = require('dotenv').config();

let connection_string = (
  process.env.CONN_STRING ? 
  process.env.CONN_STRING : 
  'mongodb://localhost/request_scheduler_db'
  ); 
mongoose.connect( connection_string , function(err){
  if (err) throw err;
  console.log('Connected to mongodb Request scheduler database');
})

var TaskSchema = mongoose.Schema({
  url:          String,
  date:         String,
  accomplished: {
    type:    Boolean,
    default: false
  },
});

var TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;
