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
        followerID: ctx.request.body.followerID,    //关注的人
        followeeID: ctx.request.body.followeeID,    //被关注的人。通常是一个人，即主体
        status: 1                                   //处于单向关注状态的，则为1
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
        followerID: ctx.request.body.followerID,
        followeeID: ctx.request.body.followeeID,
      }
    });
    if (!row.length) {
      ctx.render('signin-ok.html', {
        title: 'you have not followed this user yet.'
      })
    } else if (row[0].status === 1) {
      row[0].status = 0;
      row[0].updatedAt = now;
      await row[0].save();
    }
  },

  'POST /followerlist': async (ctx, next) => {
    let row = await Relationship.findAll({
      'attributes': ['followerID'],
      where: {
        followeeID: ctx.request.body.followeeID,
      }
    });
    let Mapping = function (x) {
      return x.followerID
    }
    ctx.body = row.map(Mapping);   //返回关注者的ID。如何返回关注者的用户名？需要重新查询吗？

    // ctx.body = JSON.parse(row, (key,value) => { return value });
  },

  'POST /followeelist': async (ctx, next) => {
    let row = await Relationship.findAll({
      'attributes': ['followeeID'],
      where: {
        followerID: ctx.request.body.followerID,
      }
    });
    console.log(row);
    let Mapping = function (x) {
      return x.followeeID
    }
    ctx.body = row.map(Mapping);   //返回被关注者的ID。如何返回用户名？需要根据ID重新查询吗？

    // ctx.body = JSON.parse(row, (key,value) => { return value });
  }

};