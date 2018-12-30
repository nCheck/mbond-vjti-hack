var mongoose = require('mongoose');
var Schema = mongoose.Schema


var passSchema = new Schema({
    
    userId : {
        type : String,
        default : 'adam'
    },

    startDate : {
        type : Date,
        default : Date.now()
    } ,

    endDate :{
        type : Date,
        default : Date.now()
    },

    startLoc : {
        type : String,
        default : 'Virar'
    } ,
    endLoc : {
        type : String,
        default : 'Churchgate'
    } ,

    goTrain : {
        type : String,
        default : '6.00AM'
    } ,

    backTrain : {
        type : String,
        default : '6.00AM'
    } ,

    imgUrl : {
        type : String,
        default : 'None'
    }

});


module.exports = mongoose.model('Pass' , passSchema);