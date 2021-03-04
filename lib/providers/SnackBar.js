import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createContext, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import NO_OP from '../utilities/noOp';
import { jsx as _jsx } from "react/jsx-runtime";
export var SnackBarOpenContext = /*#__PURE__*/createContext(false);
export var SnackBarOpenSetterContext = /*#__PURE__*/createContext(NO_OP);
export var SnackBarMessageContext = /*#__PURE__*/createContext();
export var SnackBarShowMessageContext = /*#__PURE__*/createContext(NO_OP);
var OpenProvider = SnackBarOpenContext.Provider;
var OpenSetterProvider = SnackBarOpenSetterContext.Provider;
var MessageProvider = SnackBarMessageContext.Provider;
var ShowMessageProvider = SnackBarShowMessageContext.Provider;
export var SnackBarProvider = function SnackBarProvider(_ref) {
  var children = _ref.children;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      message = _useState4[0],
      setMessage = _useState4[1];

  var queue = useRef([]);
  var setNextMessage = useCallback(function () {
    setMessage(queue.current.shift());
    setOpen(true);
  }, []);
  var processSnackBarQueue = useCallback(function () {
    setOpen(false);

    if (queue.current.length > 0) {
      ReactDOM.unstable_batchedUpdates(setNextMessage);
    }
  }, [setNextMessage]);
  var showSnackBarMessage = useCallback(function (message, severity) {
    if (message) {
      queue.current.push({
        message: message,
        severity: severity,
        key: Date.now()
      });
    }

    processSnackBarQueue();
  }, [processSnackBarQueue]);
  return /*#__PURE__*/_jsx(ShowMessageProvider, {
    value: showSnackBarMessage,
    children: /*#__PURE__*/_jsx(OpenSetterProvider, {
      value: setOpen,
      children: /*#__PURE__*/_jsx(OpenProvider, {
        value: open,
        children: /*#__PURE__*/_jsx(MessageProvider, {
          value: message,
          children: children
        })
      })
    })
  });
};
process.env.NODE_ENV !== "production" ? SnackBarProvider.propTypes = {
  children: PropTypes.node
} : void 0;