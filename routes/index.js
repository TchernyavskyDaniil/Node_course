const express = require('express');
const router = express.Router();

/* Подготовьте http-сервер, который на любой get-запрос вернет index.html */
router.all('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

module.exports = router;
