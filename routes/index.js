var express = require('express');
var router = express.Router();
var cors = require('cors')
const mysql = require('mysql');
var busFunc = require('../businessLayer/functions');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* GET all kites listing. */
router.get('/kites', cors(corsOptions), function(req, res, next) {

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asdf',
    database: 'kiteshop'
  })

  connection.connect()
  
  connection.query('select * from kites limit 0, 5', (err, rows, fields) => {
    if (err) throw err

    let kites
    //asd
    
    busFunc.removeDuplicates(rows)
    kites = busFunc.mapToBusObj(rows)

    res.json(kites)
  })
  
  connection.end()
});

module.exports = router;
