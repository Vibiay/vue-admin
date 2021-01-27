"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = _interopRequireDefault(require("@/views/Layout/index.vue"));

var _index2 = _interopRequireDefault(require("@/views/Login/index.vue"));

require("./guard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  redirect: 'login',
  hidden: true,
  meta: {
    name: '主页'
  }
}, {
  path: '/login',
  name: 'login',
  hidden: true,
  meta: {
    name: '登录'
  },
  component: _index2["default"]
}, {
  path: '/console',
  name: 'Console',
  meta: {
    name: '控制页',
    icon: 'console'
  },
  redirect: 'index',
  component: _index["default"],
  children: [{
    path: '/index',
    name: 'Index',
    meta: {
      name: '首页'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Console/index.vue'));
      });
    }
  }]
}, {
  path: '/info',
  name: 'Info',
  meta: {
    name: '信息管理',
    icon: 'info'
  },
  component: _index["default"],
  children: [{
    path: '/infoIndex',
    name: 'InfoIndex',
    meta: {
      name: '信息列表'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Info/index.vue'));
      });
    }
  }, {
    path: '/infoCatgory',
    name: 'InfoCatgory',
    meta: {
      name: '信息分类'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Info/catgory.vue'));
      });
    }
  }]
}, // 用户管理
{
  path: '/user',
  name: 'User',
  meta: {
    name: '用户管理',
    icon: 'user'
  },
  component: _index["default"],
  children: [{
    path: '/userIndex',
    name: 'UserIndex',
    meta: {
      name: '用户列表'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/User/index.vue'));
      });
    }
  }]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;