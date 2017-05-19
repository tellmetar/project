const db = require('../db');

module.exports = db.defineModel('user', {
    id: {
        autoIncrement : true,
        type: db.STRING(50),
        primaryKey: true
    },
    username: db.STRING(100),
    password: db.STRING(100),
});


