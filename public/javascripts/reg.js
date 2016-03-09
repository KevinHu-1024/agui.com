(function () {
    var email = document.getElementById('email');
    var emailStatus = false;
    var userNum = document.getElementById('user-num');
    var userNumStatus = false;
    var pw = document.getElementById('password');
    var pwRe = document.getElementById('password-re');
    var pwStatus = false;
    var name = document.getElementById('user-name');
    var nameStatus = false;
    var xieyi = document.getElementById('xieyi');
    var xieyiStatus = false;
    
    var status = false;
    var button = document.getElementById('reg-submit');
    var array = [email, pw, pwRe, name, xieyi];
    
    var numInfo = document.getElementById('num-info');
    
    for (var i = 0; i < array.length; i++) {
        array[i].onkeyup = function () {
            checkInputs.call(this);
        }
        array[i].onblur = function () {
            checkInputs.call(this);
        }
        array[i].onclick = function () {
            checkInputs.call(this);
        }
    }
    userNum.onblur = function () {
        checkInputs.call(this);
    }
    function checkStatus() {
        status = emailStatus&&userNumStatus&&pwStatus&&nameStatus&&xieyiStatus;
        status?enable():disable();
    }
    function enable() {
        button.className = 'btn btn-success';
        button.removeAttribute('disabled');
    }
    function disable() {
        button.className = 'btn btn-danger';
        button.setAttribute('disabled', 'disabled');
    }
    function changeInputStyle(status) {
        if (status) {
            this.parentElement.className ='form-group has-success';
        } else {
            this.parentElement.className ='form-group has-error';
        }
    }
    function checkInputs() {
        switch (this.id) {
            case 'user-num':
                var that = this;
                numInfo.innerHTML = '正在向服务器确认…';
                utils.reg.verifyUserUnique(this.value, function (err, result) {                   
                    if (err) {
                        numInfo.innerHTML = err;
                        console.log(err);                       
                    } else if(result) {
                        userNumStatus = (utils.reg.verifyUserNum(that.value));
                        userNumStatus?numInfo.innerHTML = '编号有效':numInfo.innerHTML = '编号格式有误';
                        console.log(userNumStatus);
                    } else {
                        userNumStatus = result;
                        numInfo.innerHTML = '用户已存在';
                    }
                    changeInputStyle.call(that, userNumStatus);
                    checkStatus();
                });                
                break;
            case 'email':
                emailStatus = utils.exp.userEmailReg.test(this.value);
                changeInputStyle.call(this, emailStatus);
                checkStatus();
                break;
            case 'user-name':
                nameStatus = utils.reg.verifyUserName(this.value);
                changeInputStyle.call(this, nameStatus);
                checkStatus();
                break;
            case 'password-re':
                pwStatus = (utils.reg.verifyInputPassword(pw.value, pwRe.value))&&(utils.exp.userPwReg.test(this.value));
                changeInputStyle.call(this, pwStatus);
                checkStatus();
                break;
            case 'xieyi':
                xieyiStatus = this.checked;
                checkStatus();
                break;
            default:
                break;
        }
    }
})();