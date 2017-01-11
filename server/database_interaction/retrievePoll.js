// Used to load requested poll (typically loaded in script tag in header)

module.exports = function(req, res){    
    
    var Entry = require('./Entry');
    
    Entry.findOne({'ID':req.query.pollID},function(err,result){
            if (err) throw err;
            // null corresponds to document not found
            if (result == null){
                res.redirect('/404');
            } else {
                res.render('poll.pug', {page: 'poll', pollName: result.name, poll: JSON.stringify(result)})    
               // res.json(result);
            }

        })
        
}