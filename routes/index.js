const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('pages/index', {auth:ctx.cookies.get('auth')});
});

module.exports = router;
