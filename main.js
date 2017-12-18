const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const base = './old';
const newFolders = './new';

const readDir = async (base, level) => {
    try {
        if (!fs.existsSync('./new')) {
            fs.mkdirSync('./new');
        }


        // Проверка если в папке что - то лежит
        let files = await readdir(base);
        let folders = await readdir(newFolders);

        files.forEach(async item => {
            let localBase = path.join(base, item);
            // console.log(localBase);
            let state = await stat(localBase);
            if (state.isDirectory()) {
                readDir(localBase, level + 1);
            } else {
                let mas = item.split('.');
                let type = mas[mas.length - 1];

                // Если такой папки нет, то создаем
                if (!folders.includes(type)) {
                    folders.push(type);
                    fs.mkdirSync(newFolders + '/' + type);
                }

                let filePath = base + '/' + item;
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.log(err.message);
                    }

                    fs.writeFile(newFolders + '/' + type + '/' + item, data, err => {
                        if (err) {
                            console.log(err.message);
                        }
                    });
                });
            }
            rimraf('old', err => {
                if (err) {
                    console.log(err.message);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
};

readDir(base, 0);