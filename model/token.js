const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    name:{ type:String },
    token:{ type:String },
    expires_in:{ type:Number },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
});

TokenSchema.pre('save',(next) => {
    if(this.isNew) {
        this.meta.createAt = this.meta.updatedAt = Date.now();

    } else {
        this.meta.updatedAt = Date.now();

    }

    next();


});


TokenSchema.statics = {
    async getAccessToken() {
        let token = await this.findOne({
            'name':'access_token'
        });

        if(token && token.token) {
            token.access_token = token.token;

        }

        return token;

    },

    async saveAccessToken(data) {
        let token = await this.findOne({
            'name':"access_token"
        });
        if(token) {
            token.token = data.acess_token;
            token.expires_in = data.expires_in;

        } else {
            token = new Token({
                name:'access_token',
                token:data.access_token,
                expires_in:data.expires_in
            })

            await token.save();

        }

        return data;
    } 
}




const Token = mongoose.model('Token',TokenSchema,'token');


module.exports = Token;





