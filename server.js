var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = new express();

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));



/******************** DB ***************************/

mongoose.connect('mongodb://localhost:27017/sample_db');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    userId: Number,
    isEditable:Boolean,
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;



app.get('/users/getAll', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'Awesome App v0.0.1');
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;
        // object of all the users
        res.send(JSON.stringify({
            error: false,
            message: "",
            data: users
        }));
    });
});

app.post('/users/save', function(req, res) {
 	var user = new User(req.body);
 	user.save(function(err) {
	  if (err) throw err;
	  res.send(JSON.stringify({
	        error: false,
	        message: "Saved success",
	        data:user
    	}));
	});

});


app.post('/users/update', function(req, res) {

	User.findById(req.body._id, function(err, user) {
	  if (err) throw err;

	  // change the users location
	  user.firstName = req.body.firstName;
	  user.userName = req.body.userName;
	  user.lastName = req.body.lastName;

	  // save the user
	  user.save(function(err) {
	    if (err) throw err;

	    res.send(JSON.stringify({
	        error: false,
	        message: "User successfully updated!",
	        data:user
  		  }));
	  });

	});

});

app.post('/users/delete', function(req, res) {

	  User.remove({ _id: req.body._id },function(err) {
	    if (err) throw err;
	    res.send(JSON.stringify({
	        error: false,
	        message: "Deleted successfully !",
	        data:[]
  		  }));	
	  });


});

app.listen(90);
console.log("App is running on port number 90");