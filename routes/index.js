var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var locals = {
    title: 'Software Projects Home',
    stylesheet: '/stylesheets/index.css'
  }
  res.render('index', locals);
});

module.exports = router;
