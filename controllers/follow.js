// blogs:

const model = require('../model');

let Relationship = model.Relationship;

var now = Date.now()

module.exports = {
  'POST /follow': async (ctx, next) => {
    var row = await Relationship.findAll({
      where: {
        follower: ctx.request.body.followerID,
      }
    });
    if (!row.length) {
      let connect = await Relationship.create({
        follower: ctx.request.body.followerID,
        followee: ctx.request.body.followeeID,
        status: 1
      });
    } else if (row[0].status === 0) {
      row[0].status = 1;
      row[0].updatedAt = now;
      await row[0].save();
    }
  },

  'POST /unfollow': async (ctx, next) => {
    let row = await Relationship.findAll({
      where: {
        follower: ctx.request.body.followerID,
      }
    });
    if (!row.length) {
      ctx.render('signin-ok.html', {
        title: 'you have not followed someone yet.'
      })
    } else if (row[0].status === 1) {
      row[0].status = 0;
      row[0].updatedAt = now;
      await row[0].save();
    }
  }

  // 'POST /followerlist'

  // 'POST //followeelist'

};