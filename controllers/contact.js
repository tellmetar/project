// contact:

module.exports = {
    'GET /contact': async (ctx, next) => {
        ctx.render('contact.html', {
            title: 'Contact me'
        });
    }
};
