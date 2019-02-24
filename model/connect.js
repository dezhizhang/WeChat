const mongoose = require('mongoose');

exports.connect = (db) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db);

        
    })
}