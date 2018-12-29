var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem');



module.exports.addProblem = (req, res)=>{

    query = req.body
    console.log(query);

    Problem.create(query, (err, doc)=>{

        if(!err){
            res.send({status : "Done", doc : doc})
        }
        else{
            res.send({status : "Error"})
        }
    })


}


module.exports.getProblem = (req, res)=>{

    id = req.body.id ;

    Problem.findById(id, (err, doc)=>{

        if(!err){
            res.send({status : "Done", data : doc});
        }
        else{
            res.send({status : "Error"})
        }
    });


}