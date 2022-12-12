import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import NO_OP from '../utilities/noOp';
import { jsx as _jsx } from "react/jsx-runtime";
export var AddSourceDialogOpenContext = /*#__PURE__*/createContext(false);
export var AddSourceDialogOpenSetterContext = /*#__PURE__*/createContext(NO_OP);
var ValueProvider = AddSourceDialogOpenContext.Provider;
var SetterProvider = AddSourceDialogOpenSetterContext.Provider;
export var AddSourceDialogOpenProvider = function AddSourceDialogOpenProvider(_ref) {
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
process.env.NODE_ENV !== "production" ? AddSourceDialogOpenProvider.propTypes = {
  children: PropTypes.node
} : void 0;