import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import NO_OP from '../utilities/noOp';
export var WordPressThemesContext = /*#__PURE__*/createContext(null);
export var WordPressThemesSetterContext = /*#__PURE__*/createContext(NO_OP);
var ValueProvider = WordPressThemesContext.Provider;
var SetterProvider = WordPressThemesSetterContext.Provider;
export var WordPressThemesProvider = function WordPressThemesProvider(_ref) {
  var children = _ref.children;

  var _useState = useState([]),
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
process.env.NODE_ENV !== "production" ? WordPressThemesProvider.propTypes = {
  children: PropTypes.node
} : void 0;