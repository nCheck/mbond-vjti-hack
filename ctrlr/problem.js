var mongoose = require('mongoose')
var http = require('http');
var request = require('request');
var Record = mongoose.model('Record'),
    Problem = mongoose.model('Problem');


const PushNotifications = require('@pusher/push-notifications-server'); 


module.exports.addProblem = async (req, res)=>{

    query = req.body
    coordinates = [ query.lat, query.lon ];
    query['location'] = { coordinates : coordinates };
    console.log(query);

    var pingToken = query.token;

    // let pushNotifications = new PushNotifications({
    //   instanceId: '814cd602-bfe8-42fe-ba72-1c601136f7ea',
    //   secretKey: '34AE575EE72CBC2CCD3BBBFACB192E1AD47E81D911622C30E7BD0E53C707541D'
    // });


    // pushNotifications.publish(['hello'], {
    //   apns: {
    //     aps: {
    //       alert: 'Hello!'
    //     }
    //   },
    //   fcm: {
    //     notification: {
    //       title: 'Hello',
    //       body: 'Hello, world!'
    //     }
    //   }
    // }).then((publishResponse) => {
    //   console.log('Just published:', publishResponse.publishId);
    // }).catch((error) => {
    //   console.log('Error:', error);
    // });


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