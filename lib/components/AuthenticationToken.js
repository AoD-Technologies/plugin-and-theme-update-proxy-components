import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _templateObject, _ExpandMoreIcon, _WifiIcon, _WifiOffIcon, _h, _h2, _Divider, _ContentCopyOutlinedI, _SettingsIcon, _DeleteIcon, _DialogContent;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { useContext, useRef, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Accordion, AccordionActions, AccordionDetails, AccordionSummary, TextField, Tooltip, Typography } from '@mui/material';
import { ContentCopyOutlined as ContentCopyOutlinedIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, Settings as SettingsIcon, Wifi as WifiIcon, WifiOff as WifiOffIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CopyToClipboard from './CopyToClipboard';
import PackageList from './PackageList';
import { WordPressPluginsContext } from '../providers/WordPressPlugins';
import { WordPressThemesContext } from '../providers/WordPressThemes';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Div = styled('div')(_templateObject || (_templateObject = _taggedTemplateLiteral([""])));
var handleStopPropagation = function handleStopPropagation(event) {
  return event.stopPropagation();
};
var styles = {
  root: {
    width: '100%'
  },
  dragHandle: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: 12
  },
  heading: {
    fontSize: function fontSize(theme) {
      return theme.typography.pxToRem(15);
    }
  },
  secondaryHeading: {
    fontSize: function fontSize(theme) {
      return theme.typography.pxToRem(15);
    },
    color: 'text.secondary'
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    flexDirection: 'column'
  },
  labelColumn: {
    flexBasis: '25%',
    display: 'flex',
    alignItems: 'center'
  },
  urlColumn: {
    flexBasis: '75%',
    display: 'flex',
    alignItems: 'center'
  }
};
var AuthenticationToken = function AuthenticationToken(_ref) {
  var authenticationToken = _ref.authenticationToken,
    onChange = _ref.onChange,
    onDelete = _ref.onDelete;
  var plugins = useContext(WordPressPluginsContext);
  var themes = useContext(WordPressThemesContext);
  var labelEl = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    configureDialogOpen = _useState2[0],
    setConfigureDialogOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    deleteDialogOpen = _useState4[0],
    setDeleteDialogOpen = _useState4[1];
  var idPrefix = useMemo(function () {
    return "authenticationToken-".concat(global.encodeURIComponent(authenticationToken.value));
  }, [authenticationToken.value]);
  var transformPlugin = useCallback(function (plugin) {
    var _authenticationToken$;
    return _objectSpread(_objectSpread({}, plugin), {}, {
      selected: (_authenticationToken$ = authenticationToken.selectedPlugins) === null || _authenticationToken$ === void 0 ? void 0 : _authenticationToken$.includes(plugin.id)
    });
  }, [authenticationToken.selectedPlugins]);
  var transformTheme = useCallback(function (theme) {
    var _authenticationToken$2;
    return _objectSpread(_objectSpread({}, theme), {}, {
      selected: (_authenticationToken$2 = authenticationToken.selectedThemes) === null || _authenticationToken$2 === void 0 ? void 0 : _authenticationToken$2.includes(theme.id)
    });
  }, [authenticationToken.selectedThemes]);
  var handleChange = useCallback(function (event) {
    onChange(event, authenticationToken);
  }, [authenticationToken, onChange]);
  var handleConfigure = useCallback(function (event) {
    setConfigureDialogOpen(false);
    console.log(labelEl.current.value);
    onChange(event, authenticationToken, {
      label: labelEl.current.value
    });
  }, [authenticationToken, onChange]);
  var handleDelete = useCallback(function (event) {
    setDeleteDialogOpen(false);
    onDelete(authenticationToken);
  }, [authenticationToken, onDelete]);
  var handleConfigureDialogOpen = useCallback(function () {
    setConfigureDialogOpen(true);
  }, []);
  var handleConfigureDialogClose = useCallback(function () {
    setConfigureDialogOpen(false);
  }, []);
  var handleDeleteDialogOpen = useCallback(function () {
    setDeleteDialogOpen(true);
  }, []);
  var handleDeleteDialogClose = useCallback(function () {
    setDeleteDialogOpen(false);
  }, []);
  var handleToggle = useCallback(function (event) {
    handleStopPropagation(event);
    handleChange(event, authenticationToken);
    return false;
  }, [handleChange, authenticationToken]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(Accordion, {
      children: [/*#__PURE__*/_jsxs(AccordionSummary, {
        expandIcon: _ExpandMoreIcon || (_ExpandMoreIcon = /*#__PURE__*/_jsx(ExpandMoreIcon, {})),
        "aria-controls": "".concat(idPrefix, "-content"),
        id: "".concat(idPrefix, "-header"),
        children: [/*#__PURE__*/_jsx(Tooltip, {
          title: authenticationToken.enabled ? 'Enabled' : 'Disabled',
          children: /*#__PURE__*/_jsx(Div, {
            sx: styles.dragHandle,
            onClick: handleToggle,
            onFocus: handleStopPropagation,
            children: authenticationToken.enabled ? _WifiIcon || (_WifiIcon = /*#__PURE__*/_jsx(WifiIcon, {})) : _WifiOffIcon || (_WifiOffIcon = /*#__PURE__*/_jsx(WifiOffIcon, {}))
          })
        }), authenticationToken.label ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Div, {
            sx: styles.labelColumn,
            children: /*#__PURE__*/_jsx(Typography, {
              sx: styles.heading,
              children: authenticationToken.label
            })
          }), /*#__PURE__*/_jsx(Div, {
            sx: styles.urlColumn,
            children: /*#__PURE__*/_jsx(Typography, {
              sx: styles.secondaryHeading,
              children: authenticationToken.value
            })
          })]
        }) : /*#__PURE__*/_jsx(Typography, {
          sx: styles.heading,
          children: authenticationToken.value
        })]
      }), /*#__PURE__*/_jsxs(AccordionDetails, {
        sx: styles.details,
        children: [_h || (_h = /*#__PURE__*/_jsx("h4", {
          children: "Plugins"
        })), /*#__PURE__*/_jsx(PackageList, {
          fieldName: "plugins",
          onChange: handleChange,
          packages: plugins.map(transformPlugin)
        }), _h2 || (_h2 = /*#__PURE__*/_jsx("h4", {
          children: "Themes"
        })), /*#__PURE__*/_jsx(PackageList, {
          fieldName: "themes",
          onChange: handleChange,
          packages: themes.map(transformTheme)
        })]
      }), _Divider || (_Divider = /*#__PURE__*/_jsx(Divider, {})), /*#__PURE__*/_jsxs(AccordionActions, {
        children: [/*#__PURE__*/_jsx(CopyToClipboard, {
          copyText: authenticationToken.value,
          buttonText: "Copy Authentication Token",
          ButtonProps: {
            variant: 'text',
            size: 'small',
            startIcon: _ContentCopyOutlinedI || (_ContentCopyOutlinedI = /*#__PURE__*/_jsx(ContentCopyOutlinedIcon, {}))
          }
        }), /*#__PURE__*/_jsx(Button, {
          size: "small",
          color: "primary",
          startIcon: _SettingsIcon || (_SettingsIcon = /*#__PURE__*/_jsx(SettingsIcon, {})),
          onClick: handleConfigureDialogOpen,
          children: "Configure"
        }), /*#__PURE__*/_jsx(Button, {
          size: "small",
          color: "secondary",
          startIcon: _DeleteIcon || (_DeleteIcon = /*#__PURE__*/_jsx(DeleteIcon, {})),
          onClick: handleDeleteDialogOpen,
          children: "Delete"
        })]
      })]
    }), /*#__PURE__*/_jsxs(Dialog, {
      open: configureDialogOpen,
      onClose: handleConfigureDialogClose,
      "aria-labelledby": "configure-".concat(idPrefix, "-dialog-title"),
      children: [/*#__PURE__*/_jsx(DialogTitle, {
        id: "configure-".concat(idPrefix, "-dialog-title"),
        children: "Configure Authentication Token"
      }), /*#__PURE__*/_jsx(DialogContent, {
        children: /*#__PURE__*/_jsx(TextField, {
          autoFocus: true,
          inputRef: labelEl,
          size: "small",
          margin: "normal",
          variant: "outlined",
          id: "label",
          label: "Label",
          type: "text",
          defaultValue: authenticationToken.label,
          fullWidth: true
        })
      }), /*#__PURE__*/_jsxs(DialogActions, {
        children: [/*#__PURE__*/_jsx(Button, {
          onClick: handleConfigureDialogClose,
          color: "primary",
          children: "Cancel"
        }), /*#__PURE__*/_jsx(Button, {
          onClick: handleConfigure,
          color: "primary",
          children: "Save"
        })]
      })]
    }), /*#__PURE__*/_jsxs(Dialog, {
      open: deleteDialogOpen,
      onClose: handleDeleteDialogClose,
      children: [_DialogContent || (_DialogContent = /*#__PURE__*/_jsx(DialogContent, {
        children: "Are you sure you want to permanently delete this authentication token?"
      })), /*#__PURE__*/_jsxs(DialogActions, {
        children: [/*#__PURE__*/_jsx(Button, {
          onClick: handleDeleteDialogClose,
          color: "primary",
          children: "Cancel"
        }), /*#__PURE__*/_jsx(Button, {
          onClick: handleDelete,
          color: "primary",
          children: "Delete"
        })]
      })]
    })]
  });
};
process.env.NODE_ENV !== "production" ? AuthenticationToken.propTypes = {
  authenticationToken: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    enabled: PropTypes.bool,
    selectedPlugins: PropTypes.arrayOf(PropTypes.string),
    selectedThemes: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
} : void 0;
export default AuthenticationToken;