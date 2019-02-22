const Koa = require('koa');
const middle = require('./utils/middle');
const config = require('./utils/config');


//创建一个实例
let app = new Koa();


//配置中间件
app.use(middle(config));

app.listen(8082,() => {
    console.log('run 8082');

})