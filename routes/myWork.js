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

    console.log(ctx.request.body);

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
    let dir = fileName.substr(fileName.indexOf('upload'));

    try {
        fs.rename(file.path, dir);
    } catch (err) {
            console.error(err);
            fs.unlink(fileName);
            fs.rename(file.path, fileName);
    }
     db.set(fileFields.projectName, {
         'file' : dir,
         'projectName':fileFields.projectName,
         'projectUrl':fileFields.projectUrl,
         'text' : fileFields.text,
     });
    db.save();
    ctx.body = jsonOk;
});

module.exports = router;
