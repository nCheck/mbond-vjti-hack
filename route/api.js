var express=require('express');
var router=express.Router();
var mongoose              = require('mongoose');

var uniCtrl = require('../ctrlr/uni'),
    recCtrl = require('../ctrlr/record'),
    probCtrl = require('../ctrlr/problem'),
    notCtrl = require('../ctrlr/notice'),
    passCtrl = require('../ctrlr/pass');





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


router.route('/notice')
        .get( notCtrl.getNotices )


router.route('/pass')
    .get( passCtrl.getPass )
        .post( passCtrl.addPass )


router.route('/addTrack')
    .post( notCtrl.addTrack );


module.exports = router