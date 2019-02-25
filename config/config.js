
const util = require('../utils/util');
const path = require('path');
let wechat_file = path.join(__dirname,'./wechat.txt');

module.exports = {
    db:"mongodb://localhost:27017/cms",
    wechat:{
        appID:'wx5af57e57248091bd',
        appsecret:'bf1b6ff43cdddea23e3be492b80449ec',
        token:'weixin',
        getAccessToken:function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken:function(data) {
            data = JSON.stringify(data);

            return util.writeFileAsync(wechat_file,data)
        }
    }
}
