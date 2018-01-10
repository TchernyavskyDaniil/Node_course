const mongoose = require('mongoose');

let permissionUserSchema = new Schema ({
    chat: {
        C: Boolean,
        R: Boolean,
        U: Boolean,
        D: Boolean
    },
    news: {
        C: Boolean,
        R: Boolean,
        U: Boolean,
        D: Boolean
    },
    setting: {
        C: Boolean,
        R: Boolean,
        U: Boolean,
        D: Boolean
    },
});

module.exports = {
    // ...
    Schema: permissionUserSchema
};