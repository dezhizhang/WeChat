
const ejs = require('ejs');


let template = `<xml>
    <ToUserName><![CDATA[<%=ToUserName%>]]></ToUserName>
    <FromUserName><![CDATA[<%=FromUserName%>]]></FromUserName>
    <CreateTime><%=createTime%></CreateTime>
    <Content>< ![CDATA[<%=content%>]]></Content> 
    </xml>`

    const compield = ejs.compile(template);

    module.exports = compield
