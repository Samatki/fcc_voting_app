
    
    var mongoose = require('mongoose');
    
    var userSchema = mongoose.Schema({
                  userRegistered: Date,
                  github: {
                      id: String,
                      displayName: String,
                      username: String,
                      publicRepos: Number
                    },
                  pollsCreated:[{
                      pollID: Number, 
                      pollName : String
                  }],
                  pollsVotedOn:[{
                      pollID:Number, 
                      votedFor:[String],
                      votedDate:Date
                  }]
                 })
    
    module.exports = mongoose.model('User', userSchema);