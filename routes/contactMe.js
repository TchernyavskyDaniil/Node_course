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
    await ctx.render('pages/contact-me');
});

router.post('/', function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.text) {
        //если что-либо не указано - сообщаем об этом
        return res.json(jsonBad);
    }

    //инициализируем модуль для отправки писем и указываем данные из конфига
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
        from: `"${req.body.name}" <${req.body.email}>`,
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text:
        req.body.text.trim().slice(0, 500) +
        `\n Отправлено с: <${req.body.email}>`
    };

    //отправляем почту
    transporter.sendMail(mailOptions, function(error, info) {
        //если есть ошибки при отправке - сообщаем об этом
        if (error) {
            jsonBad.mes = 'Письмо не отправляется';
            return res.json(jsonBad);
        }
        res.json(jsonOk);
    });
});

module.exports = router;
