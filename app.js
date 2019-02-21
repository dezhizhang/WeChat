const Koa = require('koa');
const sha1 = require('sha1');

let app = new Koa();


const config = {
    wechat:{
        appID:'wxdb58ce74f3c12db9',
        appsecret:'de0d7f5138a37f10d3ee1d386b5e0a71',
        token:'sjkfdjhkrf hkzrfionkjzrfdonkjlzfd'
    }
}


app.use(async(ctx,next) => {
   let  {signature, timestamp,nonce,echostr} = ctx.query;
   let token = config.wechat.token;
   let str = [token,timestamp,nonce].sort().join('');

   let sha = sha1(str);
   if(sha === echostr) {
       ctx.body = echostr;

   } else {
       ctx.body = 'error'
   }


});

app.listen(8082,() => {
    console.log('run 8082');
    
})