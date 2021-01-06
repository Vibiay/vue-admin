"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _elementPlus = require("element-plus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 创建axios，赋给变量service
var BASEURL = process.env_NODE_ENV === 'production' ? '' : '/api';

var service = _axios["default"].create({
  baseURL: BASEURL,
  timeout: 15000
}); // 添加请求拦截器


service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); // 添加响应拦截器

service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  var data = response.data;

  if (data.resCode != 0) {
    _elementPlus.ElMessage.error(data.message);

    return Promise.reject(data);
  } else {
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
var _default = service;
exports["default"] = _default;