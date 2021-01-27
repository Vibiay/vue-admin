"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
console.log(BASEURL);

var service = _axios["default"].create({
  baseURL: BASEURL,
  timtout: 15000
}); // 添加拦截器


service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // if(config.url != '/login'){
  //     // config.headers['X-Token'] = localStorage.getItem('token')
  // }
  return config;
}, function (error) {// return Promise.reject(error)
}); // 添加响应拦截器

service.interceptors.response.use(function (response) {
  // 对数据做点什么
  var data = response.data;

  if (data.resCode !== 0) {
    _elementUi.Message.error(data.message);

    return Promise.reject(data);
  } else {
    return response;
  }
}, function (error) {
  return Promise.reject(error);
});
var _default = service;
exports["default"] = _default;