const Koa = require('koa');
const middle = require('./middle/middle');
const config = require('./config/config');
const reply = require('./reply/reply');
const Wechat = require('./index');
const Token = require('./model/token');


let wechatConfig = {
    wechat: {
        appID:config.wechat.appID,
        appsecret:config.wechat.appsecret,
        token:config.wechat.token,
        getAccessToken:async () => {
            let res = await Token.getAccessToken();
            
            return res;

        },
        saveAccessToken:async (data) => {
            let res = await Token.saveAccessToken(data);

            return res;
        }

    }
}





//创建一个实例
let app = new Koa();




(async function(){
    let clinet = new Wechat(wechatConfig.wechat);
    
})()





//配置中间件
app.use(middle(config,reply.reply));

app.listen(8082,() => {
    console.log('run 8082');

})