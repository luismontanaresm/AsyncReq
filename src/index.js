const path       = require("path");
const express    = require("express");
const app        = express();
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const request    = require('request');
const environ    = require('dotenv').config();
let apiRoutes    = require('./API/v1/routes.js');
let Task         = require('./API/v1/models');



// settings
let AUTH_TOKEN = process.env.AUTH_TOKEN
let PORT = process.env.PORT
app.set("port", PORT || 3000)

// middlewares

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
//app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/', function(req, res){
  res.send('Task scheduler REST api');
});
app.use('/api/v1', apiRoutes);

function verbose_now(){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  const now_str = String(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  return now_str;
}

// Server start
const server = app.listen(app.get('port'), ()=>{
  console.log("\nServer on port", app.get("port"));
  (AUTH_TOKEN ? console.log("Authentication token:", AUTH_TOKEN): "")
  console.log("Server current time: ", verbose_now());
});



setInterval( async function(){
  const now_str = verbose_now();
  const tasks = await Task.find({ $and: [ {date: {$lte: now_str}}, {accomplished: false}] });
  console.log(tasks);
  tasks.forEach((task)=>{
    request(task.url, function(err, res, body){
      console.log("request to " + task.url);
    })
    task.accomplished = true;
    task.save();
  });
}, 300000);
