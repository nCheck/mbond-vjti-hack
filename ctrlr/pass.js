var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem'),
    Notice = mongoose.model('Notice'),
    Pass = mongoose.model('Pass');



module.exports.addPass = ( req, res ) =>{

    query = req.body;

    Pass.create( query , (err , doc) =>{

        if ( !err ){
            res.send({ status : 'Done' , id : doc._id })
        }
        else{
            res.send({ status : 'Error' , err : err })
        }

    } )


}



module.exports.getPass = ( req, res )=>{

    var id = req.query.id;

    Pass.findById( id , (err , doc)=>{

        if ( !err ){
            res.send({ status : 'Done' , id : doc })
        }
        else{
            res.send({ status : 'Error' , err : err })
        }   

    })

}


module.exports.addLatLon = async ( req, res )=>{

    var passId = req.body.id,
        lat = req.body.lat,
        lon = req.body.lon;

    var passDoc = await Pass.findById( passId );

    var goTrain = passDoc.goTrain.split(" ")  ,
        currTime = (new Date()).toString().split(" ")[4].split(":")  ; //Getting Time
    
    var goTime = goTrain[0];

    
    
    
    
    

}