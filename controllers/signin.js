// sign in:

const Sequelize = require('sequelize');
const config = require('../config.js');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    username: Sequelize.STRING(100),
    password: Sequelize.STRING(100),
}, {
        timestamps: false
    });


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
            // console.log(ctx.session);
            if (ctx.session.view === undefined) { //统计访问次数
                ctx.session.view = 0
            } else {
                ctx.session.view += 1
            }
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
