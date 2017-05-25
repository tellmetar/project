const db = require('../db');

module.exports = db.defineModel('relationship', {
  id: {
    type: db.STRING(50),
    primaryKey: true
  },
  followerID: db.STRING(100),
  followeeID: db.STRING(100),
  status: db.INTEGER(5),
});


