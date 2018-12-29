var express=require('express');
var router=express.Router();
var mongoose              = require('mongoose');

var uniCtrl = require('../ctrlr/uni'),
    recCtrl = require('../ctrlr/record'),
    probCtrl = require('../ctrlr/problem');





router.route('/test')
    .get(uniCtrl.trialGet)
    .post(uniCtrl.trialPost);


router.route('/problem')
    .get( probCtrl.getProblem )
        .post( probCtrl.addProblem )



router.route('/record')
    .post( recCtrl.addRecord )
        .get( recCtrl.getRecord )


router.route('/respond')
    .post( recCtrl.addResponse );


router.route('/record/nearby')
        .post( recCtrl.getNearby );









module.exports = router