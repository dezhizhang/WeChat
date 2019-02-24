const request = require('request-promise');
const baseURL =  'https://api.weixin.qq.com/cgi-bin/'
const api = {
    accessToken:baseURL + 'token?grant_type=client_credential',
}
module.exports = class Wechat {
    constructor(opts) {
        this.opts = Object.assign({},opts);
        this.appID = opts.appID;
        this.appSecret = opts.appsecret;
        this.fetchAcessToken();
      

    
    }
    //发起请求
    async request(options) {
        options = Object.assign({},options,{json:true});

        try {
            const res = await request(options);
            return res;

        } catch (err) {
            console.log(err);

        }
    }
    //获取token
    async fetchAcessToken() {
        let data
        // if(this.getAccessToken) {
            //   data = await this.getAccessToken();

        // }

        if(!this.isValidToken(data)) {
            data = await this.updateAccessToken();

        }
         return data;

    }

    //更新token
    async updateAccessToken() {
        let url =api.accessToken + `&appid=${this.appID}&secret=${this.appSecret}`;

        let data = await this.request({url});
        
        let d = new Date();
        let expiresIn = d.getTime() + (data.expires_in - 20) * 1000;

        data.expires_in = expiresIn;
        console.log(data);



    }

    //检查token是否过期
    isValidToken(data) {
        if(!data || !data.expires_in) {
            return false;

        }

        let expires_in = data.expires_in;
        let now = new Date().getTime();

        if(now < expires_in) {
            return true;

        } else {
            return false;

        }
    }
    
}