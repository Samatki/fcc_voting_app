module.exports = function(app){
    
    var express = require('express');
    
    // Pug not actually neccessary unless using pug methods
    // var pug = require('pug');
    
    app.set('view engine', 'pug')
    app.set('views', __dirname + '/public/views');
    app.use(express.static('public'));
    
    app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
    app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
    app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

    app.use('/icons', express.static(__dirname + '/node_modules/devicons/css')); // redirect devicons JS

    app.route('/')
        .get(function(req,res){
    //        res.send('blbl')
            res.render('main.pug', {page: 'Bleb'})
        })
}