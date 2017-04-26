// first blogs:

module.exports = {
    'GET /first': async (ctx, next) => {
        ctx.render('first.html', {
            title: 'first blog hahahaha'
        });
    }
};
