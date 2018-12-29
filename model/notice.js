var mongoose = require('mongoose');
var Schema = mongoose.Schema


var notSchema = new Schema({
    
    probId : {
        type : Schema.Types.ObjectId , ref : 'Problem'
    } ,

    votes : {
        type : Number,
        default : 0
    } ,

    status : {
        type : String,
        enum : ['Forwarded', 'Pending', 'Accepted'] ,
        default : 'Pending'
    }

});


module.exports = mongoose.model('Notice' , notSchema);