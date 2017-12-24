const router = require('koa-router')();
const session = require('koa-session');

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
router.get('/login', async (ctx, next) => {
    await ctx.render('pages/login');
});

// // Наше ТЗ
router.post('/', function(req, res) {
    if (!req.session.auth) {

        req.session.auth = {
            name: req.body.login,
            pass: req.body.password
        };

        res.json(jsonOk);
    } else {
        res.json(jsonBad);
    }
});

module.exports = router;
