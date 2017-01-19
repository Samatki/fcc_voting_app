module.exports = function(req, res, username, pollID) {
    if (username == null || pollID == null) {
    // Bad input, missing required information
        console.log('Error, tried to edit poll with insufficient information');
        res.json({
            'Err': 'Incorrect Information sent for edit request'
        });
    } else {
        var Entry = require('./Entry');
        // pollID and username have to match to edit poll
        Entry.findOne({
            ID: pollID,
            creator: username
        }, function(err, doc) {
            if (err) {
                console.log(err);
                res.redirect('/500');
            } else {
                if (doc == null) {
                    // Should never occur unless the client request has mistakes. doc returns null in cases where poll does not exist.
                    console.log('Error, Poll ' + pollID + ' request for edit could not be completed as poll does not exist');
                    res.json({
                        'Err': 'Poll Could not be found for deletion'
                    });
                } else {
                    // Poll found and deleted, redirects to home page.
                    res.redirect('/');
                    console.log('Entry ' + pollID + ' has been removed');
                }
            }
        });
    }
};