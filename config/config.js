
const util = require('../utils/util');
const path = require('path');
let wechat_file = path.join(__dirname,'./wechat.txt');

module.exports = {
    db:"mongodb://localhost:27017/cms",
    wechat:{
        appID:'wxdb58ce74f3c12db9',
        appsecret:'de0d7f5138a37f10d3ee1d386b5e0a71',
        token:'sjkfdjhkrfhkzrfionkjzrfdonkjlzfd',
        getAccessToken:function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken:function(data) {
            data = JSON.stringify(data);

            return util.writeFileAsync(wechat_file,data)
        }
    }
}
