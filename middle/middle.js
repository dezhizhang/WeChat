
const Koa = require('koa');
const sha1 = require('sha1');
const RawBody = require('raw-body');
const util = require('../utils/util');




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
            //接收用户传入的数据
            let data = await RawBody(ctx.req,{
                length:ctx.length,
                limit:'1mb',
                encoding:ctx.charset
            });

          


            let content = await util.parseXML(data);
           

            let message = util.formatMessage(content.xml);
           

            let d = new Date()

            ctx.status = 200;
            ctx.type = 'application/xml';
            ctx.body = `<xml>
                <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                <CreateTime>${parseInt(d.getTime())}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${message.Content}]]></Content>
                <MsgId>1234567890123456</MsgId></xml>`
        }
     
     
     }
}