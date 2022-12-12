import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import NO_OP from '../utilities/noOp';
import { jsx as _jsx } from "react/jsx-runtime";
export var AddAuthenticationTokenDialogOpenContext = /*#__PURE__*/createContext(false);
export var AddAuthenticationTokenDialogOpenSetterContext = /*#__PURE__*/createContext(NO_OP);
var ValueProvider = AddAuthenticationTokenDialogOpenContext.Provider;
var SetterProvider = AddAuthenticationTokenDialogOpenSetterContext.Provider;
export var AddAuthenticationTokenDialogOpenProvider = function AddAuthenticationTokenDialogOpenProvider(_ref) {
  var children = _ref.children;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  return /*#__PURE__*/_jsx(SetterProvider, {
    value: setValue,
    children: /*#__PURE__*/_jsx(ValueProvider, {
      value: value,
      children: children
    })
  });
};
process.env.NODE_ENV !== "production" ? AddAuthenticationTokenDialogOpenProvider.propTypes = {
  children: PropTypes.node
} : void 0;