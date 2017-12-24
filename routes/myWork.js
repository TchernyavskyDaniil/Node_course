const router = require('koa-router')();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db')();

// При ошибке
let jsonBad = {
    mes: "Описание ошибки",
    status: "Error"
};

// При правильной обработке
let jsonOk = {
    mes: "Проект успешно загружен!",
    status: "OK"
};

/* GET home page. */
router.get('/my-work', async (ctx, next) => {
    await ctx.render('pages/my-work', {auth : ctx.cookies.get('auth'), pic: db.stores.file.store});
});

router.post('/my-work', (ctx) => {
    let form = new formidable.IncomingForm();
    let upload = 'public/upload';
    let fileName;

    if (!fs.existsSync(upload)) {
        fs.mkdirSync(upload);
    }

    let file = ctx.request.body.files.file;
    let fileFields = ctx.request.body.fields;


    if (file.name === '' || file.size === 0) {
        jsonBad.mes = 'Не загружена картинка!';
        ctx.body = jsonBad;
    }
    if (!fileFields.text) {
        fs.unlink(ctx.request.body.files.file.path);
        jsonBad.mes = 'Не указано описание картинки!';
        ctx.body = jsonBad;
    }

    fileName = path.join(upload, file.name);
    fs.rename(file.path, fileName, function (err) {
        // if (err) {
        //     console.error(err);
        //     fs.unlink(fileName);
        //     fs.rename(files.file.path, fileName);
        // }
        //
        // let dir = fileName.substr(fileName.indexOf('upload'));
        // db.set(fields.projectName, {
        //     'file' : dir,
        //     'projectName':fields.projectName,
        //     'projectUrl':fields.projectUrl,
        //     'text' : fields.text,
        // });
        // db.save();
        ctx.body = jsonOk;
    });
});

module.exports = router;
