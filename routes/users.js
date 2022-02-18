var express = require('express');
var router = express.Router();
var cors = require('cors')


var corsOptions = {
  origin: 'https://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* GET users listing. */
router.get('/', cors(corsOptions), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
