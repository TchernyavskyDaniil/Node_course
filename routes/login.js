const express = require('express');
const router = express.Router();

// При ошибке
let jsonBad = {
    mes: "Логин и/или пароль введены неверно!",
    status: "Error"
};

// При правильной обработке
let jsonOk = {
    mes: "Aвторизация успешна!",
    status: "OK"
};

// Если авторизован, то при рефреше попадает на главную
const auth = (req, res, next) => {
    if (req.session.auth) {
        res.redirect('/');
    }
    return next();
};

// Рендерим
router.get('/', auth, function(req, res) {
    res.render('pages/login', { registration : req.session.auth});
});


router.post('/', function(req, res) {
    if (!req.session.auth) {

        req.session.auth = {
            name: req.body.name,
            pass: req.body.password
        };
        res.json(jsonOk);
    } else {
        res.json(jsonBad);
    }
});

module.exports = router;

