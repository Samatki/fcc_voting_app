// Packages/ Linking
require('dotenv').config()
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');

// Server initialisation
var app = express();
app.listen(process.env.PORT || 8080);
console.log('Server started on port: ' + process.env.PORT);

// Database initialisation
mongoose.connect(process.env.DB_URI)

var db = mongoose.connection;
    db.on('error', function(err){
        if(err) {
            console.error('ERROR: database access error');
            app.get('*',function(req,res){
                res.send('DATABASE ERROR, CONTACT SITE ADMINISTRATOR')
            })
        };
    });

db.once('open', function() {
    console.log('Database Loaded Successfully')
    // App only routes correctly if database is accessed.     
    routes(app);
});


