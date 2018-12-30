var mongoose = require('mongoose');
var Schema = mongoose.Schema


// const pointSchema = new mongoose.Schema({
//     type: {
//       type: String,
//       enum: ['Point'],
//       default : 'Point'
//     },
//     coordinates: {
//       type: [Number],
//       required: true
//     },
//     index: { type: '2dsphere' }
//   });

var probSchema = new Schema({
    
    userId : {
        type : Number,
        default : 101
    } ,

    name : {
        type : String,
        default : "Gaurav Rai"
    } ,
    phoneNo : {
        type : Number,
        default : 9762622540
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
        default : Date.now()
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
    },

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
    } ,

    status : {
        type : String,
        enum : ['Open', 'Closed'],
        default : 'Open'
    } ,

    token : {
        type : String,
        default : 'invalid'
    }

});


probSchema.index( { location : '2dsphere'} );

module.exports = mongoose.model('Problem' , probSchema);

