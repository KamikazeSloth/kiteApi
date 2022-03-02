var express = require('express');
var router = express.Router();
var cors = require('cors')
var busFunc = require('../businessLayer/functions');
const { corsUrl } = require('../utils/utils');
const pgp = require('pg-promise')(/* options */)
const aws = require('aws-sdk')


var corsOptions = {
  origin: corsUrl,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* GET all kites listing. */
router.get('/kites', cors(corsOptions), function(req, res, next) {

  let s3 = new aws.S3({
    S3_DBPWD: process.env.S3_DBPWD,
    S3_DBUSER: process.env.S3_DBUSER,
    S3_DBNAME: process.env.S3_DBNAME,

    S3_DBHOST: process.env.S3_DBHOST,
    S3_DBPORT: process.env.S3_DBPORT,
    S3_DBDATABASE: process.env.S3_DBDATABASE
  });

console.log("asd", s3)

  const db = pgp(`postgres://${s3.S3_DBUSER}:${s3.S3_DBPWD}@${s3.S3_DBHOST}:${s3.S3_DBPORT}/${s3.S3_DBDATABASE}`)
  
  db.any('select * from kites')
    .then((data) => {
      console.log('DATA:', data)

  
        let kites

        busFunc.removeDuplicates(data)
        kites = busFunc.mapToBusObj(data)
    
        res.json(kites)
      })
      .catch((error) => {
        console.log('ERROR:', error)
      })
    })
  

module.exports = router;
