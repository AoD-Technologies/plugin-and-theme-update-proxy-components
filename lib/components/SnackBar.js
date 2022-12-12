import { useContext, useCallback } from 'react';
import { Alert, Snackbar as MUISnackbar } from '@mui/material';
import { SnackBarMessageContext, SnackBarShowMessageContext, SnackBarOpenContext, SnackBarOpenSetterContext } from '../providers/SnackBar';
import { jsx as _jsx } from "react/jsx-runtime";
var SnackBar = function SnackBar() {
  var open = useContext(SnackBarOpenContext);
  var setOpen = useContext(SnackBarOpenSetterContext);
  var data = useContext(SnackBarMessageContext);
  var showSnackBarMessage = useContext(SnackBarShowMessageContext);
  var handleSnackBarClose = useCallback(function (event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, [setOpen]);
  var handleSnackBarExited = useCallback(function () {
    showSnackBarMessage();
  }, [showSnackBarMessage]);
  return /*#__PURE__*/_jsx(MUISnackbar, {
    open: open,
    autoHideDuration: 6000,
    onClose: handleSnackBarClose,
    onExited: handleSnackBarExited,
    children: data ? /*#__PURE__*/_jsx(Alert, {
      elevation: 6,
      variant: "filled",
      onClose: handleSnackBarClose,
      severity: data.severity,
      children: data.message
    }) : null
  }, data === null || data === void 0 ? void 0 : data.key);
};
export default SnackBar;