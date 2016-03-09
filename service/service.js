var crypto = require('crypto');
var Question = require('../model/question');
var User = require('../model/user');

module.exports = {
    parseToMd5: function parseToMd5(src) {
        var md5 = crypto.createHash('md5');
        var result = md5.update(src).digest('hex');
        return result;
    },
    verifyUnique: function verifyUnique(collectionName, forCheck, callback, returnInstance) {
        try {
                collectionName.get(forCheck, function (err, instance) {
                if (err) {
                    callback({error: err});
                } else {
                    if (instance.length!=0) {                       
                        returnInstance?(callback({error:null, code:'02', instance:instance})):(callback({error:null, code:'02', instance:null}));
                    } else {
                        callback({error:null, code:'01', instance: null});
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}