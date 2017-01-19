
    
    var mongoose = require('mongoose');
    
    var pollSchema = mongoose.Schema({
        //name: String
        
                        ID : String,
                        name : String,
                        description: String,
                        creator : String,
                        creationDate: Date,
                        pollOptions : {
                            allowEdit: Boolean,
                            allowAdditionOfOptions: Boolean,
                            allowUserToVoteForMultiplCategories : Boolean,
                            // Default Chart type = pie chart
                            pollChartType : String
                        },
                        pollData: [
                            {
                                entryID: Number,
                                entryName:String,
                                entryVotes:Number,
                                entryColor:String,
                                entryCreator: String,
                                entryCreationDate: Date,
                            },
                        ],
                        voters: [String]
    });

    module.exports = mongoose.model('pollData', pollSchema);


    
