"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
};
var getters = {
  isCollapse: function isCollapse(state) {
    return state.isCollapse;
  }
};
var mutations = {
  SET_COLLAPSE: function SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
  }
};
var actions = {
  login: function login(context, data) {
    return new Promise(function (resolve, reject) {
      // 接口 
      Login(data).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;