const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const uuid = require('uuid/v4');
const bCrypt = require('bcrypt-nodejs');

const Permission = require('../models/permissionUser');
const User = require('../models/user');

// v4 - random
let token = uuid();

// POST-запрос на /api/saveNewUser - создание нового пользователя (регистрация).
// Необходимо вернуть объект созданного пользователя.

router.post('/saveNewUser', function(req, res) {

});

//  POST-запрос на /api/login - авторизация после пользователького ввода.
//  Необходимо вернуть объект авторизовавшегося пользователя.

router.post('/login', function (req, res) {

});

//  Автоматический POST-запрос на /api/authFromToken - авторизация при наличии токена.
//  Необходимо вернуть объект авторизовавшегося пользователя.

router.post('/authFromToken', function(req, res) {

});

//  PUT-запрос на /api/updateUser/:id - обновление информации о пользователе.
//  Необходимо вернуть объект обновленного пользователя.

router.put('/updateUser/:id', function(req, res) {

});

// DELETE-запрос на /api/deleteUser/:id - удаление пользователя.

router.delete('/deleteUser/:id', function(req, res) {

});

// POST-запрос на /api/saveUserImage/:id - сохранение изображения пользователя.
// Необходимо вернуть объект со свойством path, которое хранит путь до сохраненного изображения.

router.post('/saveUserImage/:id', function(req, res) {

});

//  Автоматический GET-запрос на /api/getNews - получение списка новостей.
//  Необходимо вернуть список всех новостей из базы данных.

router.get('/getNews', function(req, res) {

});

//  POST-запрос на /api/newNews - создание новой новости.
//  Необходимо вернуть обновленный список всех новостей из базы данных.

router.post('/newNews', function(req, res) {

});

//  PUT-запрос на /api/updateNews/:id - обновление существующей новости.
//  Необходимо вернуть обновленный список всех новостей из базы данных.

router.put('/updateNews/:id', function(req, res) {

});

//  DELETE-запрос на /api/deleteNews/:id - удаление существующей новости.
//  Необходимо вернуть обновленный список всех новостей из базы данных.

router.delete('/deleteNews/:id', function(req, res) {

});

//  Автоматический GET-запрос на /api/getUsers - получение списка пользователей.
//  Необходимо вернуть список всех пользоватлей из базы данных.

router.get('/getUsers', function(req, res) {

});

//  PUT-запрос на /api/updateUserPermission/:id - обновление существующей записи о разрешениях конкретного пользователя.
//  (Более подробную информацию о url, дополнительных параметрах и передаваемых данных запроса вы можете получить через средства разработчика при взаимодействии с интерфейсом).

router.put('/updateUserPermission/:id', function(req, res) {

});

module.exports = router;
