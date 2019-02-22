const sha1 = require('sha1');
const RawBody = require('raw-body');
const util = require('../utils/util');


module.exports =(option,reply) => {
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
            //接收用户传入的数据
            let data = await RawBody(ctx.req,{
                length:ctx.length,
                limit:'1mb',
                encoding:ctx.charset
            });

          
            let content = await util.parseXML(data);
            let message = util.formatMessage(content.xml);

            ctx.weixin = message;

           
            //消息回复
            await reply.apply(ctx,[ctx,next]);
            let replyBody = ctx.body;
            let msg = ctx.weixin;
            let xml = util.tpl(replyBody,msg);
            ctx.status = 200;
            ctx.type="applyication/xml";
            ctx.body = xml;
        }
     
     
     }
}