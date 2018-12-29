var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem'),
    Notice = mongoose.model('Notice');

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

module.exports.addResponse = async (req, res)=>{


    var val = req.body.resp, 
        id  = req.body.id;

    if ( val == 0 ){
        res.send({status : "Done"});
    }
    else{


        if ( val == 1 ){


            Record.findByIdAndUpdate( id, { $inc : { yes : 1 } },  async (err, doc)=>{

                if(!err && doc != null ){

                    if ( doc.yes > 3 ){
                        await sendNotification( doc );
                        // await deleteRecord( doc._id );
                    }


                    res.send({status : "Done", doc : doc})
                }
                else{
                    res.send({status : "Error", error : err})
                }
    
            });            

        }
        else{

            Record.findByIdAndUpdate( id, { $inc : { nos : 1 } },  async (err, doc)=>{

                if(!err && doc != null ){

                    if ( doc.nos > 3 ){
                        await deleteRecord( doc._id );
                    }

                    res.send({status : "Done", doc : doc})
                }
                else{
                    res.send({status : "Error", error : err})
                }
    
            });

        }


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
    data.forEach(ele => {  probs.push( ele._id )    });

    Record.find({ probId : { $in : probs } }, (err, doc)=>{


        if(!err){
            res.send({status : "Done", doc : doc})
        }
        else{
            res.send({status : "Error", error : err})
        }

    } )


    

}





sendNotification = ( doc ) =>{

    var query = {
        probId : doc.probId,
        votes : doc.yes
    }
    
    var probId = query.probId;

    return new Promise( (resolve, reject)=>{

        Notice.create( query , (err, doc)=>{
        
            if(err){
                reject(err);
            }
            else{

                Problem.findByIdAndUpdate( probId , { $set : { status : 'Closed' }
                 } , (err, docc) =>{

                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(docc);
                    }


                 } )

            }

        } )

    } )

}


deleteRecord = ( recId ) =>{

    return new Promise( ( resolve , reject )=>{

        Record.findByIdAndRemove( recId , ( err , doc )=>{

            if(err){
                reject(err);
            }
            else{
                resolve(doc);
            }

        } )

    } )


}