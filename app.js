const Koa = require('koa');
const middle = require('./middle/middle');
const config = require('./config/config');
const reply = require('./reply/reply');


//创建一个实例
let app = new Koa();


//配置中间件
app.use(middle(config.wechat,reply.reply));



app.listen(8082,() => {
    console.log('run 8082');

})







