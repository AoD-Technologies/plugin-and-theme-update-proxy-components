import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { AddAuthenticationTokenDialogOpenContext, AddAuthenticationTokenDialogOpenSetterContext } from '../providers/AddAuthenticationTokenDialogOpen';

var _ref2 = /*#__PURE__*/_jsx(DialogTitle, {
  id: "add-authentication-token-dialog-title",
  children: "Add Authentication Token"
});

var AddAuthenticationTokenDialog = function AddAuthenticationTokenDialog(_ref) {
  var onAdd = _ref.onAdd;
  var open = useContext(AddAuthenticationTokenDialogOpenContext);
  var setOpen = useContext(AddAuthenticationTokenDialogOpenSetterContext);
  var labelEl = useRef(null);
  var handleAdd = useCallback(function () {
    onAdd({
      label: labelEl.current.value,
      value: uuidv4(),
      enabled: true,
      selectedPlugins: []
    });
  }, [onAdd]);
  var handleClose = useCallback(function () {
    setOpen(false);
  }, [setOpen]);
  return /*#__PURE__*/_jsxs(Dialog, {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "add-authentication-token-dialog-title",
    children: [_ref2, /*#__PURE__*/_jsx(DialogContent, {
      children: /*#__PURE__*/_jsx(TextField, {
        autoFocus: true,
        inputRef: labelEl,
        size: "small",
        margin: "normal",
        variant: "outlined",
        id: "label",
        label: "Label",
        type: "text",
        fullWidth: true
      })
    }), /*#__PURE__*/_jsxs(DialogActions, {
      children: [/*#__PURE__*/_jsx(Button, {
        onClick: handleClose,
        color: "primary",
        children: "Cancel"
      }), /*#__PURE__*/_jsx(Button, {
        onClick: handleAdd,
        color: "primary",
        children: "Save"
      })]
    })]
  });
};

process.env.NODE_ENV !== "production" ? AddAuthenticationTokenDialog.propTypes = {
  onAdd: PropTypes.func.isRequired
} : void 0;
export default AddAuthenticationTokenDialog;