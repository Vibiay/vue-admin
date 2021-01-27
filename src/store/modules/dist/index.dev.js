"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var app = {
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  },
  getters: {},
  mutations: {
    SET_COLLAPSE: function SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    }
  },
  actions: {// login(context,data){
    // return new Promise((resolve,reject)=>{
    //     // 接口 
    //     Login(data).then(res=>{
    //     resolve(res)
    //     }).catch(err=>{
    //     reject(err)
    //     })
    // })
    // }
  },
  modules: {}
};
var _default = app;
exports["default"] = _default;