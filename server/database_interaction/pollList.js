// For sending content to the main page on load (index of polls)

module.exports = function(pageNo, noEntriesPerPage, res){
    
  var Entry = require('./Entry');
 
  Entry.count({}, function(err, count){
      
    if (err) {
        console.log(err);
        //Strictly speaking shouldn't be a 500 error, but will do as placeholder
        res.redirect('/500');
    } else {
        
        // Initializes response
        var responseObject = {
            requestedPage: null,
            noOfPages: Math.ceil(count / noEntriesPerPage),
            polls: []
        }
        
        
        // Validation of number of values to skip (pagination)
        var skipped = 0;
        
        if (noEntriesPerPage >= count){
            skipped = 0;
            responseObject.requestedPage = 1;
        }
        else if (pageNo >= Math.ceil(count / noEntriesPerPage)){
            skipped =  ((Math.ceil(count / noEntriesPerPage)-1)*noEntriesPerPage);
            responseObject.requestedPage = Math.ceil(count / noEntriesPerPage);
        }
        else{
            skipped = ((pageNo - 1) < 0) ? 0 : ((pageNo-1)*noEntriesPerPage);
            responseObject.requestedPage = (skipped == 0) ? 1 : pageNo;  
        }
        
        // Searching database for required options
        Entry.find({}, { name: 1, creator: 1, ID: 1, creationDate: 1, _id:0 }, { limit: noEntriesPerPage, sort:{creationDate: -1}, skip: skipped }, function(err, data){
            if (err) throw err;
            responseObject.polls = data;
            res.json(responseObject)
        })

    }
        
    });
    
    
};