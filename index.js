const request = require('request-promise');
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
const baseURL =  'https://api.weixin.qq.com/cgi-bin/'
const api = {
    accessToken:'token?grant_type=client_credential',
}
module.exports = class Wechat {
    constructor(opts) {
        this.opts = Object.assign({},opts);
        this.appID = opts.appID;
        this.appSecret = opts.appSecret;
        this.fetchAcessToken();


    }
    //发起请求
    async request(options) {
        options = Object.assign({},options,{json:true});

        try {
            const res = await this.request(options);
            return res;

        } catch (err) {
            console.log(err);

        }
    }
    //获取token
    async fetchAcessToken() {
        let data = '';
        // if(this.getAccessToken) {
            //   data = await this.getAccessToken();

        // }

        // if(!this.isValidToken(data)) {
        //     data = await this.updateAccessToken();

        // }
        // return data;

    }

    //更新token
    async updateAccessToken() {
        let url = api.accessToken + `&appid=${this.appID}&secret=${this.appSecret}`;
        let data = await this.request({url});

    }

    //检查token是否过期
    isValidToken(data) {

    }
    
}