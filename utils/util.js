const xml2js = require('xml2js');
const template = require('../template/template');
const fs = require('fs');
const Promise = require('bluebird');





exports.parseXML = xml => {
    return new Promise((resolve,reject) => {
        xml2js.parseString(xml,{trim:true},(err,result) => {
           if(err) {
               return reject(err);

           } else {
               resolve(result);

           }

        })
    })
}

exports.formatMessage = result => {
    let message = {};
    if(typeof result ==='object') {
        let keys = Object.keys(result);
        for(let i=0;i<keys.length;i++){
            let item = result[keys[i]];
            let key = keys[i];

            if(!(item instanceof Array) || item.length ==0) {
                continue
            }

            if(item.length ==1) {
                let value = item[0];

                if(typeof value ==='object') {
                    message[key] = formatMessage(value);
                   
                } else {
                    message[key] = (value || '').trim()
                }
            } else {
                message[key]  = [];
                for(let j=0;j<item.length;j++) {
                    message[key].push(formatMessage(item[j]));

                }
            }
            
        }
    }
    return message;


}

exports.tpl = (content,message) => {
    let type = 'text';
    if(Array.isArray(content)) {
        type = 'news';

    }

    if(!content) content ='消息为空';
    if(content && content.type) {
        type = content.type;

    }

    let info = Object.assign({}, {
        content: content,
        createTime: new Date().getTime(),
        msgType: type,
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName
      })
    
      return template(info)

}


exports.readFileAsync = function(fpath,encoding) {
    return new Promise((resolve,reject) => {
        fs.readFile(fpath,encoding,(error,content) => {
            if(error) {
                reject(error);

            } else {
                resolve(content);

            }
        })
    })
}


exports.writeFileAsync = function(fpath,content) {
    return new Promise(function(resolve,reject) {
        fs.writeFile(fpath,content,(err,content) => {
            if(err) {
                reject(err);

            } else {
                resolve(content);

            }
        })
    })
}


