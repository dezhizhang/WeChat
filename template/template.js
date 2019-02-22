
const ejs = require('ejs');


let template = `<xml>
    <ToUserName><![CDATA[<%=FromUserName%>]]></ToUserName>
    <FromUserName><![CDATA[<%=ToUserName%>]]></FromUserName>
    <CreateTime><%=createTime%></CreateTime>
    <Content>< ![CDATA[<%=content%>]]></Content> 
    </xml>`

    const compield = ejs.compile(template);

    module.exports = compield
