var mongoose = require('mongoose')
var http = require('http');
var request = require('request');
var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem');



module.exports.addProblem = async (req, res)=>{

    query = req.body
    coordinates = [ query.lat, query.lon ];
    query['location'] = { coordinates : coordinates };
    console.log(query);

    var pingToken = query.token;
    var path = 'http://devdost.me/notify.php?token=' + pingToken;

    console.log(path);

    var options = {
        url : path
      };


    var ress = await request.get(options, (error, response, body)=>{

        console.log(error)
        console.log(response)
        console.log(body)
    }) ;








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

    // console.log(query);

    return new Promise( (resolve, reject)=>{

        Problem.find(query, (err, doc)=>{

            // console.log(err, " - ", doc)
            if(!err){
                resolve({status : "Done", data : doc}) ;
            }
            else{
                reject({status : "Error"});
            }
    
    
        })


    } )

} 