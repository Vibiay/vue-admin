"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 自定义icon组件
_vue["default"].component('svg-icon', _SvgIcon["default"]);

var req = require.context('./svg', false, /\.svg$/);

var requireAll = function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
};

requireAll(req);