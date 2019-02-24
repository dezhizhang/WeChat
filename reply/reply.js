exports.reply = async (ctx,next) => {
    let message = ctx.weixin;

    if(message.MsgType =='text') {
        let content = message.Content;
        let reply = 'Oh,你说的'+ content + '太复杂了无法解析';
        if(content == '1') {
            reply = '你好呀'
        } else if(content == '2') {
            reply = '你说的我不太明白';

        } else if(content == '3') {
            reply = '没有找你说的内容';

        }else {
            reply = content;
            
        }

        ctx.body = reply;
        
    }
    await next();
    

}