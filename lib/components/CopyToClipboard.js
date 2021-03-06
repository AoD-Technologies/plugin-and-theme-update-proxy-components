import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import { Button, Tooltip } from '@material-ui/core';
import { jsx as _jsx } from "react/jsx-runtime";

var CopyToClipboard = function CopyToClipboard(_ref) {
  var ButtonProps = _ref.ButtonProps,
      TooltipProps = _ref.TooltipProps,
      buttonText = _ref.buttonText,
      copyText = _ref.copyText;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var handleClose = useCallback(function () {
    setOpen(false);
  }, []);
  var handleClick = useCallback(function () {
    copyToClipboard(copyText);
    setOpen(true);
  }, [copyText]);
  return /*#__PURE__*/_jsx(Tooltip, _objectSpread(_objectSpread({
    title: "Copied to Clipboard!",
    leaveDelay: 1500
  }, TooltipProps), {}, {
    open: open,
    onClose: handleClose,
    children: /*#__PURE__*/_jsx(Button, _objectSpread(_objectSpread({
      variant: "contained",
      color: "primary"
    }, ButtonProps), {}, {
      onClick: handleClick,
      children: buttonText
    }))
  }));
};

CopyToClipboard.defaultProps = {
  TooltipProps: {},
  ButtonProps: {},
  buttonText: 'Copy'
};
process.env.NODE_ENV !== "production" ? CopyToClipboard.propTypes = {
  ButtonProps: PropTypes.shape(Button.propTypes),
  TooltipProps: PropTypes.shape(Tooltip.propTypes),
  buttonText: PropTypes.string,
  copyText: PropTypes.string.isRequired
} : void 0;
export default CopyToClipboard;