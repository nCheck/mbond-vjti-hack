var mongoose = require('mongoose')




module.exports.trialGet = async(req, res) =>{

    console.log(req.query, " q ")
    console.log(req.body , " b ")

    res.send({"status" : "Done"})
}



module.exports.trialPost = (req, res) =>{

    console.log(req.query, " q ")
    console.log(req.body , " b ")

    res.send({"status" : "Done"})
}

