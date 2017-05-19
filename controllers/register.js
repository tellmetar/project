// register:
const User = require('../models/User');

module.exports = {
    'GET /register': async (ctx, next) => {
        ctx.render('register.html', {
            title: 'register'
        });
    },

    'POST /register': async (ctx, next) => {
        const ifregistered = await User.findAll({
            where: {
                username: ctx.request.body.email,
            }
        });
        if (!ifregistered[0]) {
            const u = await User.create({
                username: ctx.request.body.email,
                password: ctx.request.body.password
            });
            ctx.render('register-success.html', {
                title: 'register-success',
                name: ctx.request.body.email,
                passw: ctx.request.body.password
            });
        } else {
            ctx.render('register-fail.html', {
                title: 'register-fail',
                name: ctx.request.body.email
            });
        }

    }
}
