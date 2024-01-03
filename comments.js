// Create web server

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/comments');

// Create app
var app = express();

// Configure app
app.use(bodyParser());

// Define schema
var CommentSchema = mongoose.Schema({
  name: String,
  email: String,
  comment: String
});

// Define model
var Comment = mongoose.model('Comment', CommentSchema);

// Define routes
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/comments', function(req, res) {
  Comment.find(function(err, comments) {
    res.json(comments);
  });
});

app.post('/comments', function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.send(200);
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started');
});