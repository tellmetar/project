// sign in:
const User = require('../models/User');

module.exports = {
    'GET /signin': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Plz signin'
        });
    },
    'POST /signin': async (ctx, next) => {
        var u = await User.findAll({
            where: {
                username: ctx.request.body.email
            }
        });
        // console.log(JSON.stringify(u));
        // console.log(u);
        // console.log(u[0].password);
        // console.log(ctx.request.body.password);

        if (u[0].password === ctx.request.body.password) {
            console.log('signin ok!');
            if (ctx.session.view === undefined) { //统计访问次数
                ctx.session.view = 0
            } else {
                ctx.session.view += 1
            }
            // console.log(ctx.session);
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: `Mr ${u[0].username}`
            });
        } else {
            console.log('signin failed!');
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed'
            });
        }
    }
};
