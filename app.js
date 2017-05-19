'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require("koa-session2");
const Store = require("./store");
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//get/set session
app.use(session({
    key: "SESSIONID",   //default "koa:sess"
    store: new Store(),
    maxAge: 5 * 60 * 1000  //设置session超时时间
}));

// parse request body 解析原始request请求。
// bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
