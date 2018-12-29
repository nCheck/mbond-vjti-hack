var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem'),
    Notice = mongoose.model('Notice');



module.exports.getNotices = ( req, res )=>{

    Notice.find({}, (err, doc)=>{

        if(!err){
            res.render( 'record'  , { status : "Done", data : doc } )
        }else{
            res.send( { status : "Error", error : err } )
        }

    })


}


