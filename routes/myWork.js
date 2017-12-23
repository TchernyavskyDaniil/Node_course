const express = require('express');
const router = express.Router();
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
router.get('/', function(req, res) {
    res.render('pages/my-work', {pic: db.stores.file.store});
});

router.post('/', (req, res, next) => {
    let form = new formidable.IncomingForm();
    let upload = 'public/upload';
    let fileName;

    if (!fs.existsSync(upload)) {
        fs.mkdirSync(upload);
    }

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.json(jsonBad);
        }

        if (files.file.name === '' || files.file.size === 0) {
            jsonBad.mes = 'Не загружена картинка!';
            return res.json(jsonBad);
        }

        if (!fields.text) {
            fs.unlink(files.file.path);
            jsonBad.mes = 'Не указано описание картинки!';
            return res.json(jsonBad);
        }

        fileName = path.join(upload, files.file.name);

        fs.rename(files.file.path, fileName, function (err) {
            if (err) {
                console.error(err);
                fs.unlink(fileName);
                fs.rename(files.file.path, fileName);
            }

            let dir = fileName.substr(fileName.indexOf('upload'));
            db.set(fields.projectName, {
                'file' : dir,
                'projectName':fields.projectName,
                'projectUrl':fields.projectUrl,
                'text' : fields.text,
            });
            db.save();
            res.json(jsonOk);
        });
    })
});

module.exports = router;
