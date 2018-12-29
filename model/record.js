var mongoose = require('mongoose');
var Schema = mongoose.Schema


var recSchema = new Schema({
    
    probId : {
        type : Schema.Types.ObjectId , ref : 'Problem'
    } ,

    yes : {
        type : Number,
        default : 0
    } , 

    nos : {
        type : Number,
        default : 0
    }

});


module.exports = mongoose.model('Record' , recSchema);