// books:

module.exports = {
    'GET /books': async (ctx, next) => {
        ctx.render('books.html', {
            title: 'Books hahahaha'
        });
    }
};
