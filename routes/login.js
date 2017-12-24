const router = require('koa-router')();

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
const auth = (ctx, next) => {
    if (ctx.cookies.get('auth')) {
        ctx.response.redirect('/');
    }
    return next();
};

// Рендерим
router.get('/login', auth, async (ctx, next) => {
    await ctx.render('pages/login', {auth : auth});
});

// // Наше ТЗ
router.post('/login', (ctx, next) => {
    if (!ctx.cookies.get('auth')) {
        ctx.cookies.set('auth', JSON.stringify(`{ name : ${ctx.request.body.login}, pass : ${ctx.request.body.password} }`), { maxAge: 860000 });
        ctx.body = jsonOk;
    } else {
        ctx.body = jsonBad;
    }
});

// Реализовать
// router.post('/', (ctx, next) => {
//     ctx.cookies.set('auth', null, {maxAge: 0});
//     ctx.redirect('/')
// });
module.exports = router;
