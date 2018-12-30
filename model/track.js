var mongoose = require('mongoose');
var Schema = mongoose.Schema


var trackSchema = new Schema({
    
    passId : {
        type : Schema.Types.ObjectId , ref : 'Pass'
    } ,

    location: { 
        type: {
            type: String,
            enum: ['Point'],
            default : 'Point'
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }, 
    
    hits : {
        type : Number,
        default : 0
    }

});


module.exports = mongoose.model('Track' , trackSchema);