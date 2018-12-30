var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem'),
    Notice = mongoose.model('Notice'),
    Track = mongoose.model('Track');



module.exports.getNotices = ( req, res )=>{

    Notice.find({}, (err, doc)=>{

        if(!err){
            res.render( 'record'  , { status : "Done", data : doc } )
        }else{
            res.send( { status : "Error", error : err } )
        }

    })


}


module.exports.addTrack = ( req, res )=>{

    var passId = req.body.id,
        coordinates = [ req.body.lat, req.body.lon ];

    var query = {
        passId : passId,
        location : {
            coordinates : coordinates
        }
    }

    Track.create( query , (err, doc) =>{

        if ( !err ){
            res.send({status : 'Done', doc : doc})
        }
        else{
            res.send({status : 'Error', err : err})
        }

    } )


}