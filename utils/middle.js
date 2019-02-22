
const Koa = require('koa');
const sha1 = require('sha1');




module.exports =(option) => {
    return async(ctx,next) => {
        let  {signature, timestamp,nonce,echostr} = ctx.query;
        
        
        let token = option.wechat.token;
        let str = [token,timestamp,nonce].sort().join('');
        let sha = sha1(str);

        if(ctx.method == 'GET') {
            if(sha === signature) {
                ctx.body = echostr;
         
            } else {
               ctx.body ='wang'
            }
        } else if(ctx.method == 'POST') {
            if(sha !==signature) {
                return (ctx.body =='failed');
            }
        }
     
     
     }
}