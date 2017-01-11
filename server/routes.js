module.exports = function(app){
    
    var express = require('express');
    var mongoose = require('mongoose');
    var loadPoll = require('./database_interaction/retrievePoll');
    var pollList = require('./database_interaction/pollList');
    // Pug not actually neccessary unless using pug methods
    // var pug = require('pug');

    app.route('/test')
        .get(function(req,res){
            pollList(1, 20, res)
         //  res.send('TEST');
        }) 

    app.route('/404')
        // 404 Error
        .get(function(req,res){
            res.status(404).render('404.pug', {page: '404'});    
        });
        
    app.route('/500')
        // oops something went wrong error
        .get(function(req,res){
            res.status(500).render('500.pug', {page: '500'});    
        });    
        
    app.route('/')
        .get(function(req,res){
            res.render('main.pug', {page: 'main'})
        })


/*    app.route('/:path?')
        .get(function(req,res){});
  */      

        // Check if file exists, if not    res.redirect('/404')
            
    //        res.send('blbl')
    // For Quick Testing
   /* if(req.params.path == 'poll'){
        var pollID = req.query.pollID;
        //loadEntry(pollID, res);        
        console.log(req.query.pollID);
    

        
      res.render(req.params.path + '.pug', {page: 'poll', pollName: xxx.name, poll: JSON.stringify(xxx)})  
    }
    else{
        console.log('triggered2')
      res.render(req.params.path + '.pug', {page: req.params.path})  
         // res.render('main.pug', {page: 'main'})
         }
        }) */
        
    app.route('/poll')
        .get(function(req,res){ loadPoll(req,res)});

        
    // API //
        
        // PUBLIC ROUTE ON MAIN PAGE //
        
    app.route('/API/getCurrentEntries')
        .get(function(req,res){
            var page = parseInt(req.query.page);
            var noEntriesPerPage = 20;
            if (!page){ page = 1 }
            // get Poll Name, Poll Creator, Poll URL, date created from database
            pollList(page, noEntriesPerPage, res);
        });
        
        // Detects all other URLS and redirects to 404 
        app.route('*')
            .get(function(req,res){
                res.redirect('/404');
            }); 
        
};