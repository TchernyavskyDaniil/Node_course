const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const base = './old';
const newFolders = './new';

const readDir = (base, level) => {
    if (!fs.existsSync('./new')) {
        fs.mkdirSync('./new');
    }

    // Проверка если в папке что - то лежит
    let files = fs.readdirSync(base);
    let folders = fs.readdirSync(newFolders);

    files.forEach( item => {
        let localBase = path.join(base, item);
        // console.log(localBase);
        let state = fs.statSync(localBase);
        if (state.isDirectory()) {
            readDir(localBase, level + 1);
        } else {
            let mas = item.split('.');
            let type = mas[mas.length -1];

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

                // Выбрали способ глупца через rimraf
                // Удаляем все наши расширения
                // fs.unlink(filePath, err => {
                //     if (err) {
                //         console.log(err.message);
                //     }
                // });
            });
        }

        // Нативно не вышло, я выбрал способ глупца rimraf
        // files.forEach(dir => {
        //     fs.rmdir(localBase, err => {
        //         if (err) {
        //             console.log(err.message);
        //         }
        //     });
        // });

        rimraf('old', err => {
            if (err) {
                console.log(err.message);
            }
        });
    });
};

readDir(base, 0);