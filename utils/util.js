const xml2js = require('xml2js');

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


