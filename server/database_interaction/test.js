require('dotenv').config()
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://voting_app_admin:voteyvoteyvotevote@ds157158.mlab.com:57158/voting_app')

var Entry = require('./Entry')

mongoose.connection.on('open',function(){
    console.log('connected')
    Entry.findOne({'ID':'xyz2'},function(err,data){
        if (err) throw err;
        console.log(data)
        data.pollData[0].entryVotes = data.pollData[0].entryVotes + 1;
     //   data.save(function(err){
       //     if (err) throw err;
    //    });
    })
})