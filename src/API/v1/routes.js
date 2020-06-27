let router = require('express').Router();
let Task = require('./models');
let environ = require('dotenv').config();

let auth_token = process.env.AUTH_TOKEN;
//


router.get("/", function(req, res){
  res.json({
    status: "Scheduling API",
    message: "Scheduling API is running"
  })
})



// Create task
/*
Creates a new Task instance on database.
- input:
-- url      String
-- datetime String YY-mm-dd hh:mm:ss
- output:
-- task _id
*/
router.get("/create", async function(req, res){
  if ( auth_token && (! req.query.auth_token || req.query.auth_token != auth_token) ){
      res.json({
        status: -1,
        message: "Permission denied",
      });
  } else {
    var datetime = req.query.datetime;
    var url      = req.query.url;
    const task   = new Task({
      date: datetime,
      url: url,
      accomplished: false,
    });
    await task.save();
    res.json({
      status: 1,
      message: task,
    });
  }

});

// List tasks
router.get("/list", async function(req, res){
  if ( auth_token && (! req.query.auth_token || req.query.auth_token != auth_token) ){
      res.json({
        status: -1,
        message: "Permission denied",
      });
  } else {
    const tasks = await Task.find();
    res.json({
      status: 1,
      message: tasks,
    });
  }

});

// Delete task
router.get("/delete/:_id", function(req, res){
  if ( auth_token && (! req.query.auth_token || req.query.auth_token != auth_token) ){
      res.json({
        status: -1,
        message: "Permission denied",
      });
  } else {
    const id = req.params._id;
    Task.deleteOne({_id: id}, function(err){
      if (err) {
        res.json({
          status: 0,
          message: err
        });
      } else {
        res.json({
          status: 1,
          message: "document id: " + id + " deleted"
        })
      }
    });
  }
});
module.exports = router;
