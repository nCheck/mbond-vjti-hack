var mongoose = require('mongoose')

var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem');



module.exports.addProblem = (req, res)=>{

    query = req.body
    coordinates = [ query.lat, query.lon ];
    query['location'] = { coordinates : coordinates };
    console.log(query);

    Problem.create(query, (err, doc)=>{

        if(!err){
            res.send({status : "Done", doc : doc})
        }
        else{
            res.send({status : "Error", err : err})
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


var locQuery = (coords, distance) => {
    return { location: { $near: { $geometry: { type: "Point", coordinates: coords, index : '2dsphere' }, $maxDistance: parseInt(distance)}}}
}


module.exports.getNearbyProblem = ( lat, lon ) =>{

    var query = locQuery( [lat, lon], 1000 );

    console.log(query);

    return new Promise( (resolve, reject)=>{

        Problem.find(query, (err, doc)=>{

            console.log(err, " - ", doc)
            if(!err){
                resolve({status : "Done", data : doc}) ;
            }
            else{
                reject({status : "Error"});
            }
    
    
        })


    } )

} 