module.exports = function(req, res){    
    
    var Entry = require('./Entry');
    
    Entry.count({}, function(err, count){
        if (err) {
            res.status(500).json({Message : 'Something Went Wrong'})
        } else {
    
    var newEntry = new Entry({
        
                        ID : (count + 1000).toString(32),
                        name : 'TestyTest',
                        description: 'TestTestTest',
                        creator : 'CXXX',
                        creationDate: new Date(),
                        pollOptions : {
                            allowEdit: true,
                            allowAdditionOfOptions: true,
                            allowUserToVoteForMultiplCategories : false,
                            // Default Chart type = pie chart
                            pollChartType : 'pie'
                        },
                        pollData: [
                            {
                                entryID: 1,
                                entryName:'Duck',
                                entryVotes:55,
                                entryColor:'blue',
                                entryCreator: 'SamTest',
                                entryCreationDate: new Date(),
                                voters: ['S','A'],
                                voterIPs:['IP1','IP2']
                            },
                            {
                                entryID: 2,
                                entryName:'Cats',
                                entryVotes:20,
                                entryColor:'red',
                                entryCreator: 'SamTest',
                                entryCreationDate: new Date(),
                                voters: ['S','A'],
                                voterIPs:['IP1','IP2']                                
                            },
                        ],
                        voters: ['Sam','Sam','Sam','Sam'],
                        voterIPs: ['IP1','IP2','IP3']
    })
    
    newEntry.save(function (err, newEntry) {
        if (err) return console.error(err);
        res.json({message:'Entry Created!'})
        console.log('Entry ' + newEntry.ID + ' saved')
    });
}
});
}