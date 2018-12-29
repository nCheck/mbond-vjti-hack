var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem');

var probCtrl = require('./problem');



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

    var recId = req.query.id;

    Record.findById(recId).populate('probId').then( doc=>{

        if(doc){
            res.send({status : "Done", doc : doc})
        }
        else{
            res.send({status : "Error"})
        }

    })

}


module.exports.getNearby =  async (req, res)=>{

    var lat = req.body.lat, 
        lon = req.body.lon;

    // console.log("inside rec");

    var nearbys = await probCtrl.getNearbyProblem(lat, lon);

    var data = nearbys.data;
    var probs = [];
    data.forEach(ele => {
        
        probs.push( ele._id )

    });

    Record.find({ probId : { $in : probs } }, (err, doc)=>{


        if(!err){
            res.send({status : "Done", doc : doc})
        }
        else{
            res.send({status : "Error", error : err})
        }

    } )


    

}