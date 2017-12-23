var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('pages/index', { auth : req.session.auth});
});

module.exports = router;
