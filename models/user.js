const mongoose = require('mongoose');

let userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    img: String,
    middleName: String,
    permissionId: String,
    permission: Object,
    surName: String,
    access_token: String
});

module.exports = {
    Schema: userSchema
};