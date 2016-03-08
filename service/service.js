var crypto = require('crypto');
module.exports = {
    parseToMd5: function parseToMd5(src) {
        var md5 = crypto.createHash('md5');
        var result = md5.update(src).digest('hex');
        return result;
    }
}