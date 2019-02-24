const mongoose = require('mongoose');
const glob = require("glob");
const path = require('path');
mongoose.Promise = global.Promise;



exports.initSchema = () => {
    glob.sync(path.resolve(__dirname,'./token','**/*.js')).forEach(require);

}


exports.connect = (db) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db);
        mongoose.connection.on('disconnect',() => {
            console.log('数据库以断开边接');

        });

        mongoose.connection.on('error',(error) => {
            console.log(error)
        });

        mongoose.connection.on('open',() => {
            resolve();
            console.log('数据库连接成功');

        })

        
    })
}