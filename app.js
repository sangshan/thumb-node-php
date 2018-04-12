const Koa = require('koa') // koa v2
const Router = require('koa-router')
const request = require('superagent')
const path = require('path')
const views = require('koa-views')
const static = require('koa-static')
var router = new Router();
const app = new Koa()

const staticPath = './static'
app.use(static(
    path.join( __dirname,  staticPath)
))

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
  }))

const count=function(ctx, text){
    return new Promise((resolve, reject)=>{
        request
        .get(`http://localhost/php/mysql.php?method=${text}`)
        .end(function(err, res) {
            if (err) {
                console.log(err);
                //do something
            } else {
                ctx.body=res.text;
                resolve();
            }
        })
    })
}
router.get('/', async (ctx, next) => {
    await ctx.render('index')
});
router.get('/get', async (ctx, next) => {
    await count(ctx, 'get');
});
router.get('/add', async (ctx, next) => {
    await count(ctx, 'add');
  });
router.get('/index/index', async (ctx, next) => {
    await ctx.render('index')
});
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)
console.log('the server is starting at port 3000')