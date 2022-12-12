var _DialogTitle, _FormHelperText;
import { useContext, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, FormControlLabel, FormHelperText, Switch, TextField } from '@mui/material';
import { AddSourceDialogOpenContext, AddSourceDialogOpenSetterContext } from '../providers/AddSourceDialogOpen';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var AddSourceDialog = function AddSourceDialog(_ref) {
  var onAdd = _ref.onAdd;
  var open = useContext(AddSourceDialogOpenContext);
  var setOpen = useContext(AddSourceDialogOpenSetterContext);
  var labelEl = useRef(null);
  var updateURLEl = useRef(null);
  var authenticationTokenEl = useRef(null);
  var skipSSLCertificateChecksEl = useRef(null);
  var handleAdd = useCallback(function () {
    onAdd({
      label: labelEl.current.value,
      updateURL: updateURLEl.current.value,
      authenticationToken: authenticationTokenEl.current.value,
      skipSSLCertificateChecks: skipSSLCertificateChecksEl.current.checked,
      enabled: true,
      selectedPlugins: [],
      selectedThemes: []
    });
  }, [onAdd]);
  var handleClose = useCallback(function () {
    setOpen(false);
  }, [setOpen]);
  return /*#__PURE__*/_jsxs(Dialog, {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "add-source-dialog-title",
    children: [_DialogTitle || (_DialogTitle = /*#__PURE__*/_jsx(DialogTitle, {
      id: "add-source-dialog-title",
      children: "Add Source"
    })), /*#__PURE__*/_jsxs(DialogContent, {
      children: [/*#__PURE__*/_jsx(TextField, {
        autoFocus: true,
        inputRef: labelEl,
        size: "small",
        margin: "normal",
        variant: "outlined",
        id: "label",
        label: "Label",
        type: "text",
        fullWidth: true
      }), /*#__PURE__*/_jsx(TextField, {
        inputRef: updateURLEl,
        size: "small",
        margin: "normal",
        variant: "outlined",
        id: "updateURL",
        label: "URL",
        type: "url",
        required: true,
        helperText: "This is provided in the Hosting tab (on the source site)",
        fullWidth: true
      }), /*#__PURE__*/_jsx(TextField, {
        inputRef: authenticationTokenEl,
        size: "small",
        margin: "normal",
        variant: "outlined",
        id: "authenticationToken",
        label: "Authentication Token",
        type: "password",
        required: true,
        fullWidth: true
      }), /*#__PURE__*/_jsxs(FormControl, {
        variant: "standard",
        component: "fieldset",
        children: [/*#__PURE__*/_jsx(FormGroup, {
          children: /*#__PURE__*/_jsx(FormControlLabel, {
            value: "skipSSLCertificateChecks",
            control: /*#__PURE__*/_jsx(Switch, {
              inputRef: skipSSLCertificateChecksEl
            }),
            label: "Skip SSL Certificate Checks"
          })
        }), _FormHelperText || (_FormHelperText = /*#__PURE__*/_jsxs(FormHelperText, {
          children: ["Use this if the source site has an insecure SSL certificate", /*#__PURE__*/_jsx("br", {}), "NOTE: You should install a secure SSL certificate on the source site instead!"]
        }))]
      })]
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
process.env.NODE_ENV !== "production" ? AddSourceDialog.propTypes = {
  onAdd: PropTypes.func.isRequired
} : void 0;
export default AddSourceDialog;