const router = require('koa-router')();
const nodemailer = require('nodemailer');
const config = require('../config.json');

// При ошибке
let jsonBad = {
    mes: "Описание ошибки",
    status: "Error"
};

// При правильной обработке
let jsonOk = {
    mes: "Сообщение отправлено!",
    status: "OK"
};

/* GET home page. */
router.get('/contact-me', async (ctx, next) => {
    await ctx.render('pages/contact-me', {auth:ctx.cookies.get('auth')});
});

router.post('/contact-me', function (ctx) {
    if (!ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.text) {
        //если что-либо не указано - сообщаем об этом
        ctx.body = jsonBad;
    }

    //инициализируем модуль для отправки писем и указываем данные из конфига
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
        from: `"${ctx.request.body.name}" <${ctx.request.body.email}>`,
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text:
        ctx.request.body.message.trim().slice(0, 500) +
        `\n Отправлено с: <${ctx.request.body.email}>`
    };

    //отправляем почту
    transporter.sendMail(mailOptions, function(error, info) {
        //если есть ошибки при отправке - сообщаем об этом
        if (error) {
            jsonBad.mes = 'Письмо не отправляется';
            return ctx.body = jsonBad;
        }
        ctx.body = jsonOk;
    });
});

module.exports = router;
