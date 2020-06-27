const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/request_scheduler_db', function(err){
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
