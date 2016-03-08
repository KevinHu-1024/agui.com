var utils = {
    exp: {
        userNumReg: /^(AGUI-)(\d+)/,
        userNameReg:new RegExp('[A-Za-z0-9_\-\u4e00-\u9fa5]+'),
        userEmailReg: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        userPwReg: /^[\S|\s]{6,16}$/,
        userPhoneReg: /^(0|86|17951)?((13[0-9]|15[012356789]|17[05678]|18[0-9]|14[57])[0-9]{8})$/
    },
    common: {
        overTime: function overTime(time, info, callback) {
            var str = info;
            var overTimer = window.setTimeout(function () {
                callback(str+time, null);
            }, time);
            return overTimer;//返回定时器索引，供清除使用
        }
    },
    reg: {//邮箱/两次密码/客官号正则/唯一性验证ajax
        verifyInputEmail: function verifyInputEmail(em) {
            return utils.exp.userEmailReg.test(em);
        },
        verifyInputPassword: function verifyInputPassword(pw, pw_re) {
            return pw === pw_re;
        },
        verifyUserNum: function verifyUserNum(num) {
            return utils.exp.userNumReg.test(num);
        },
        verifyUserName: function verifyUserName(name) {
            return utils.exp.userNameReg.test(name);
        },
        verifyUserUnique: function verifyUserUnique(num, callback) {
            var xhr = new XMLHttpRequest();
            var flag =false;
            xhr.open('GET', '/verifyUserUnique?num='+num, true);
            var overTimer = utils.common.overTime(4000, '服务器超时', callback);
            xhr.onreadystatechange = function () {
                if (xhr.readyState==4 && xhr.status==200) {
                    window.clearTimeout(overTimer);
                    if(xhr.responseText == '01') {
                        flag = true;
                    } else {
                        flag = false;
                    }
                    typeof(callback) === 'function'?callback(null, flag):callback('typeError', null);
                }
            };
           try {
               xhr.send();
           } catch (error) {
               callback(error);
           }
        }
    },
    login: {
        verifyUserLogin: function verifyUserLogin(num, password) {
            
        }
    }
}