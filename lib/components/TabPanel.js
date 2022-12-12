import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "value", "index"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { jsx as _jsx } from "react/jsx-runtime";
var TabPanel = function TabPanel(_ref) {
  var children = _ref.children,
    value = _ref.value,
    index = _ref.index,
    other = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_jsx(Typography, _objectSpread(_objectSpread({
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "action-tabpanel-".concat(index),
    "aria-labelledby": "action-tab-".concat(index)
  }, other), {}, {
    children: /*#__PURE__*/_jsx(Box, {
      sx: {
        p: 3
      },
      children: children
    })
  }));
};
process.env.NODE_ENV !== "production" ? TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
} : void 0;
export default TabPanel;