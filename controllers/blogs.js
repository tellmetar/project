// blogs:

module.exports = {
    'GET /blogs': async (ctx, next) => {
        ctx.render('blogs.html', {
            title: 'blogs hahahaha'
        });
    }
};

