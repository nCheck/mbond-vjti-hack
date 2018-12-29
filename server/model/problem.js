var mongoose = require('mongoose');
var Schema = mongoose.Schema


var probSchema = new Schema({
    
    userId : {
        type : Number,
        default : 101
    } ,

    timestamp : {
        type : Date,
        default : Date.now()
    } , 

    query : {
        type: String,
        // enum : [ 'Doorblocking' , 'Footover Bridge Congestion', 'Theft', 'Toilets not maintened' ]
    } ,

    timeOfOcc : {
        type : Date,
        default : null
    } ,

    imageUrl : {
        type : String,
        default : null
    } ,

    placeName : {
        type : String
    } , 
    lat : {
        type : Number
    } ,
    lon : {
        type : Number
    }

});


module.exports = mongoose.model('Problem' , probSchema);