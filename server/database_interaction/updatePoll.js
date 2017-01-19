module.exports = function(req,res, pollID, categoryID, categoryName, userID, userIP){
    
    var Entry = require('./Entry');
    
    Entry.findOne({ 'ID': pollID }, function (err, doc ) {
        if(err) throw err;
        if (doc == null){
            // Can't find poll for whatever reason (likely database error)
            res.redirect('/500');
        }
        // Check if page can be edited
        //else if(doc.pollOptions.allowEdit == false){
        //    res.json('No editing allowed!');
        //}
        else{
        // Found the poll
            if(doc.pollOptions.allowUserToVoteForMultiplCategories == false){
            // Checks handler to see if user can vote in multiple categories    
                if(doc.voters.includes(userID)||doc.voterIPs.includes(userIP)){
                // Checks voter list and IP list to see if user has already voted    
                    res.json('Already voted on this poll!');
                }else{
                // User has not already voted    
                    for(var i = 0; i<doc.pollData.length; i++){
                    // Iterates over entries in pollData    
                        var currCategory = doc.pollData[i];
                        if(currCategory.entryID == categoryID){
                        // Finds matching category to user input    
                            doc.voters.push(userID);
                            doc.voterIPs.push(userIP);
                            currCategory.voters.push(userID);
                            currCategory.voterIPs.push(userIP);
                            currCategory.entryVotes = currCategory.entryVotes + 1;
                            doc.save(function(err){
                                if (err) throw err;
                            });
                            console.log('New vote on poll ' + pollID);
                            res.redirect('/poll/?pollID='+pollID);
                            break;
                        } else if (i == doc.pollData.length - 1){
                        if (doc.pollOptions.allowAdditionOfOptions){
                            // Adds additional category to poll database
                            doc.pollData.push({
                                entryID: doc.pollData.length,
                                entryName:categoryName,
                                entryVotes:0,
                                entryColor:'red', // 'hsla('+this.entryID*25%360+',65%,68%,1)'
                                entryCreator: userID,
                                entryCreationDate: new Date(),
                                voters:[],
                                voterIPs:[]                                
                            })
                            doc.save(function(err){
                                if (err) throw err;
                            })
                            console.log('New vote on poll ' + pollID);
                            res.redirect('/poll/?pollID='+pollID);
                        }else{
                            // Did not find matching category to user input, should not occur other than in cases where a bad request has been sent from the client    
                            res.json('Could not find category to vote on')
                        };
                        }
                    }
                }        
            } else {
            // Multiple category votes are allowed on the poll    
                for(var i = 0; i<doc.pollData.length; i++){
                // Iterates over entries in pollData    
                    var currCategory = doc.pollData[i];
                    if(currCategory.entryID == categoryID){
                        // Finds matching cateogory to user vote
                        if(currCategory.voters.includes(userID)||currCategory.userIPs.includes(userIP)){
                        // If user has already voted, refuse vote
                            res.json('Already voted for this category on this poll')
                            break;
                        } else {
                        // User has not already voted for category
                            doc.voters.includes(userID) ? null : doc.voters.push(userID); 
                            doc.voterIPs.includes(userIP) ? null : doc.voterIPs.push(userIP);
                            // If userID or IP is already in the list, do nothing, else add user ID and IP to category voting record
                            currCategory.voters.push(userID);
                            currCategory.voterIPs.push(userIP);
                            currCategory.entryVotes = currCategory.entryVotes + 1;
                            doc.save(function(err){
                                if (err) throw err;
                            });
                            console.log('New vote on poll ' + pollID);
                            res.redirect('/poll/?pollID='+pollID);
                            break;
                        }
                    } else  if (i == doc.pollData.length - 1){
                            if (doc.pollOptions.allowAdditionOfOptions){
                            // Adds additional category to poll database
                            doc.pollData.push({
                                entryID: doc.pollData.length,
                                entryName:categoryName,
                                entryVotes:0,
                                entryColor:'red', // 'hsla('+this.entryID*25%360+',65%,68%,1)'
                                entryCreator: userID,
                                entryCreationDate: new Date(),
                                voters:[],
                                voterIPs:[]                                
                            })
                            doc.save(function(err){
                                if (err) throw err;
                            })
                            console.log('New vote on poll ' + pollID);
                            res.redirect('/poll/?pollID='+pollID);
                            } else {
                        // Did not find matching category to user input, should not occur other than in cases where a bad request has been sent from the client                      
                            res.json('Could not find category to vote on');
                    }
                } 
            }
        }    
    }
    }); 
};