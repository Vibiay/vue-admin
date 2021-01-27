"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSms = GetSms;
exports.Login = Login;
exports.Register = Register;

var _request = _interopRequireDefault(require("@/utils/request.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 获取验证码*/
function GetSms(data) {
  console.log(data);
  return _request["default"].request({
    method: 'post',
    url: '/getSms/',
    data: data
  });
}
/**
 * 获取用户角色
 */

/**
 * 登录
 */


function Login(data) {
  return _request["default"].request({
    method: "post",
    url: "/login/",
    data: data
  });
}
/**
 * 注册
 */


function Register(data) {
  return _request["default"].request({
    method: "post",
    url: "/register/",
    data: data
  });
}