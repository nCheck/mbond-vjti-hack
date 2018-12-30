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