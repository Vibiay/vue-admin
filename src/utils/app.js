import cookie from 'cookie_js'

const adminToken = 'admin_toKen'
const usernameKey = "username"

export function getToKen(){
    return cookie.get(adminToken)
}

export function setToKen(toKen){
    return cookie.set(adminToken,toKen)
}
export function removeToKen(){
    return cookie.remove(adminToken)
}

export function getUserName(){
    return cookie.get(usernameKey)
}
export function setUserName(value){
    return cookie.set(usernameKey,value)
}
export function removeUserName(){
    return cookie.remove(usernameKey)
}