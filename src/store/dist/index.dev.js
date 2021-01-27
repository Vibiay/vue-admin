"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _login = require("@/api/login");

var _app = _interopRequireDefault(require("./modules/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {// isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) ||false
  },
  getters: {},
  mutations: {// SET_COLLAPSE(state){
    //   state.isCollapse = !state.isCollapse
    //   sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    // }
  },
  actions: {
    login: function login(context, data) {
      return new Promise(function (resolve, reject) {
        // 接口 
        (0, _login.Login)(data).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          reject(err);
        });
      });
    }
  },
  modules: {
    app: _app["default"]
  }
});

exports["default"] = _default;