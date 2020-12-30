"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSms = GetSms;
exports["default"] = void 0;

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 获取验证码
 */
function GetSms(data) {
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

/**
 * 注册
 */


var _default = {};
exports["default"] = _default;