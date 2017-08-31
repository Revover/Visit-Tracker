var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/clients', function(req, res, next) {
  res.send('send clients back');
});

module.exports = router;
