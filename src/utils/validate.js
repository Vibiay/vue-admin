/**
 *  过滤特殊字符
 * **/ 
export function stripscript(str){
    var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]")
    var rs = "";
    for(var i = 0;i<str.length;i++){
        rs = rs + str.substr(i,1).replace(pattern,'');
    }
    return rs;
}

/**
 * 验证邮箱
 * */ 
export function validateEmail(value){
    let reg = /^([a-zA-z]|[0-9])(\w|\-)+@[a-zA-z0-9]+\.([a-zA-z]{2,4})$/;
    return !reg.test(value) ? true :false
}

/**
 * 验证密码 6-20位字母+数字
 * */ 
export function validatePass(value){
     let reg = /^(?!\D6+$)(?![^a-zA-z]+$)\S{6,20}$/
     return !reg.test(value) ? true :false
}

/**
 * 验证验证码
 * */ 
export function validateCode(value){
    let reg = /^[a-z0-9]{6}$/ 
    return !reg.test(value) ? true :false
}