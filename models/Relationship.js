const db = require('../db');

module.exports = db.defineModel('relationship', {
  id: {
    type: db.STRING(50),
    primaryKey: true
  },
  follower: db.STRING(100),
  followee: db.STRING(100),
  status: db.INTEGER(5),
});


