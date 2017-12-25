const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-body');
const logger = require('koa-logger');
const index = require('./routes/index');
const login = require('./routes/login');
const contact = require('./routes/contactMe');
const work = require('./routes/myWork');
const fs = require('fs');
// const users = require('./routes/users')

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    multipart: true,
    formidable: {
        uploadDir: __dirname + '/public/upload'
    }
}));

let upload = 'public/upload';

if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
}

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(contact.routes(), contact.allowedMethods());
app.use(work.routes(), work.allowedMethods());
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
