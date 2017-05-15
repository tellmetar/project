// register:
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
    'GET /register': async (ctx, next) => {
        ctx.render('register.html', {
            title: 'register'
        });
    },

    'POST /register': async (ctx, next) => {
        var users = await User.create({
            username: ctx.request.body.email,
            password: ctx.request.body.password
        });
        ctx.render('register-success.html', {
            title: 'register-success',
            name: `Mr ${users.username}`,
            passw: `${users.password}`
        });
    }
}
