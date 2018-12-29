var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem');





module.exports.addRecord = (req, res)=>{

    var id = req.body.id;

    Record.create({probId : id}, (err, doc)=>{

        if(!err){
            res.send({status : "Done", doc : doc})
        }
        else{
            res.send({status : "Error"})
        }

    });

}

module.exports.addResponse = (req, res)=>{


    var val = req.body.resp, 
        id  = req.body.id;

    if ( val == 0 ){
        res.send({status : "Done"});
    }
    else{

        Record.findByIdAndUpdate( id, { $inc : { yes : 1 } }, (err, doc)=>{

            if(!err){
                res.send({status : "Done", doc : doc})
            }
            else{
                res.send({status : "Error"})
            }

        });
    }

}


module.exports.getRecord = (req, res)=>{

    var recId = req.body.id;

    Record.findById(recId, (err, doc)=>{

        if(!err){
            res.send({status : "Done", doc : doc})
        }
        else{
            res.send({status : "Error"})
        }

    })

}