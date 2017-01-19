// Packages/ Linking
require('dotenv').config()
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./server/routes');

// Server initialisation
var app = express();
app.listen(process.env.PORT || 8080, function(){
    console.log('Server started on port: ' + this.address().port)    
});

// App Parameters 
app.set('view engine', 'pug')
app.set('views', __dirname + '/public/views');
app.use(express.static('./public'));

    // Hosted JS Libraries
app.use('/js', express.static(__dirname + '/node_modules/chart.js/dist'));    
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/chart.js/dist/')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Database initialisation
mongoose.connect(process.env.DB_URI)

var db = mongoose.connection;
    db.on('error', function(err){
        if(err) {
            console.error('ERROR: database access error');
            app.get('*',function(req,res){
                res.status(503).send('DATABASE CONNECTION ERROR, CONTACT SITE ADMINISTRATOR')
            })
        };
    });

db.once('open', function() {
    console.log('Database Loaded Successfully')
    // App only routes correctly if database is accessed.     
    routes(app);
});


