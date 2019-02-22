
const ejs = require('ejs');


let template = `<xml>
    <ToUserName><![CDATA[<%=message.FromUserName%>]]></ToUserName>
    <FromUserName><![CDATA[<%=message.ToUserName%>]]></FromUserName>
    <CreateTime><%=createTime%></CreateTime>
    <%if(msgType=='text'){%>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[<%- message.Conten%>]]></Content>
    <%}%> else if(msgType == 'image'){%>
       <Image>
            <MediaId><![CDATA[<%=content.mediaId%>]]></MediaId>
       </Image>
    <%} else if(msgType == 'video'){%>
        <Video>
            <MediaId><![CDATA[<%=content.mediaId%>]]></MediaId>
        </Video>
    <%}%>
    </xml>`

    const compield = ejs.compile(template);

    module.exports = compield
