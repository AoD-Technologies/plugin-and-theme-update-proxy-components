import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var _br, _ContentCopyOutlinedI, _Divider, _p, _CircularProgress, _p2, _CircularProgress2, _p3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { useState, useContext, useCallback, useEffect } from 'react';
import { Backdrop, CircularProgress, Divider } from '@mui/material';
import { Add as AddIcon, ContentCopyOutlined as ContentCopyOutlinedIcon, Wifi as WifiIcon } from '@mui/icons-material';
import AddAuthenticationTokenDialog from './AddAuthenticationTokenDialog';
import AuthenticationToken from './AuthenticationToken';
import CopyToClipboard from './CopyToClipboard';
import { AddAuthenticationTokenDialogOpenSetterContext } from '../providers/AddAuthenticationTokenDialogOpen';
import { SnackBarShowMessageContext } from '../providers/SnackBar';
import { WordPressPluginsContext } from '../providers/WordPressPlugins';
import { WordPressThemesContext } from '../providers/WordPressThemes';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HostingPanel = function HostingPanel() {
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    authenticationTokens = _useState4[0],
    setAuthenticationTokens = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showBackdrop = _useState6[0],
    setShowBackdrop = _useState6[1];
  var setAddAuthenticationTokenDialogOpen = useContext(AddAuthenticationTokenDialogOpenSetterContext);
  var showSnackBarMessage = useContext(SnackBarShowMessageContext);
  var plugins = useContext(WordPressPluginsContext);
  var themes = useContext(WordPressThemesContext);
  var handleAddAuthenticationTokenDialogClose = useCallback(function () {
    setAddAuthenticationTokenDialogOpen(false);
  }, [setAddAuthenticationTokenDialogOpen]);
  useEffect(function () {
    if (showSnackBarMessage) {
      global.fetch("".concat(global.PTUP.ajaxURL, "?action=ptup_authentication_tokens")).then(function (res) {
        return res.json();
      }).then(function (authenticationTokens) {
        setAuthenticationTokens(authenticationTokens);
      })["catch"](function (e) {
        showSnackBarMessage("Failed to load authentication tokens!".concat(e.message ? " Reason: ".concat(e.message) : ''), 'error');
      })["finally"](function () {
        setLoading(false);
      });
    }
  }, [showSnackBarMessage]);
  var saveAuthenticationTokens = useCallback(function (newAuthenticationTokens) {
    if (showSnackBarMessage) {
      setAuthenticationTokens(newAuthenticationTokens);
      setShowBackdrop(true);
      global.fetch("".concat(global.PTUP.ajaxURL, "?action=ptup_authentication_tokens"), {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newAuthenticationTokens)
      }).then(function (res) {
        if (res.status !== 200) {
          throw new Error();
        }
        showSnackBarMessage('Authentication tokens saved successfully!', 'success');
        handleAddAuthenticationTokenDialogClose();
      })["catch"](function (e) {
        showSnackBarMessage("Failed to save authentication tokens!".concat(e.message ? " Reason: ".concat(e.message) : ''), 'error');
        if (process.env.NODE_ENV === 'production') {
          setAuthenticationTokens(authenticationTokens);
        } else {
          handleAddAuthenticationTokenDialogClose();
        }
      })["finally"](function () {
        setShowBackdrop(false);
      });
    }
  }, [handleAddAuthenticationTokenDialogClose, showSnackBarMessage, authenticationTokens]);
  var handleAdd = useCallback(function (newAuthenticationToken) {
    var newAuthenticationTokens = Array.from(authenticationTokens);
    newAuthenticationTokens.splice(0, 0, newAuthenticationToken);
    saveAuthenticationTokens(newAuthenticationTokens);
  }, [saveAuthenticationTokens, authenticationTokens]);
  var handleChange = useCallback(function (event, authenticationToken, newValues) {
    var index = authenticationTokens.indexOf(authenticationToken);
    if (index === -1) {
      return;
    }
    if (event.target.name === 'plugins[]') {
      var newSelectedPlugins = authenticationToken.selectedPlugins ? Array.from(authenticationToken.selectedPlugins).filter(function (selectedPlugin) {
        return plugins.some(function (plugin) {
          return plugin.id === selectedPlugin;
        });
      }) : [];
      if (event.target.checked) {
        if (newSelectedPlugins.includes(event.target.value)) {
          return;
        }
        newSelectedPlugins.push(event.target.value);
      } else {
        var selectedPluginIndex = newSelectedPlugins.indexOf(event.target.value);
        if (selectedPluginIndex === -1) {
          return;
        }
        newSelectedPlugins.splice(selectedPluginIndex, 1);
      }
      var newAuthenticationTokens = Array.from(authenticationTokens);
      newAuthenticationTokens[index] = _objectSpread(_objectSpread({}, authenticationToken), {}, {
        selectedPlugins: newSelectedPlugins
      });
      saveAuthenticationTokens(newAuthenticationTokens);
    } else if (event.target.name === 'themes[]') {
      var newSelectedThemes = authenticationToken.selectedThemes ? Array.from(authenticationToken.selectedThemes).filter(function (selectedTheme) {
        return themes.some(function (theme) {
          return theme.id === selectedTheme;
        });
      }) : [];
      if (event.target.checked) {
        if (newSelectedThemes.includes(event.target.value)) {
          return;
        }
        newSelectedThemes.push(event.target.value);
      } else {
        var selectedThemeIndex = newSelectedThemes.indexOf(event.target.value);
        if (selectedThemeIndex === -1) {
          return;
        }
        newSelectedThemes.splice(selectedThemeIndex, 1);
      }
      var _newAuthenticationTokens = Array.from(authenticationTokens);
      _newAuthenticationTokens[index] = _objectSpread(_objectSpread({}, authenticationToken), {}, {
        selectedThemes: newSelectedThemes
      });
      saveAuthenticationTokens(_newAuthenticationTokens);
    } else if (newValues) {
      var _newAuthenticationTokens2 = Array.from(authenticationTokens);
      _newAuthenticationTokens2[index] = _objectSpread(_objectSpread({}, authenticationToken), newValues);
      saveAuthenticationTokens(_newAuthenticationTokens2);
    } else {
      var _newAuthenticationTokens3 = Array.from(authenticationTokens);
      _newAuthenticationTokens3[index] = _objectSpread(_objectSpread({}, authenticationToken), {}, {
        enabled: !authenticationToken.enabled
      });
      saveAuthenticationTokens(_newAuthenticationTokens3);
    }
  }, [plugins, themes, authenticationTokens, saveAuthenticationTokens]);
  var handleDelete = useCallback(function (authenticationToken) {
    var index = authenticationTokens.indexOf(authenticationToken);
    if (index === -1) {
      return;
    }
    var newAuthenticationTokens = Array.from(authenticationTokens);
    newAuthenticationTokens.splice(index, 1);
    saveAuthenticationTokens(newAuthenticationTokens);
  }, [saveAuthenticationTokens, authenticationTokens]);
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("p", {
      style: {
        marginTop: 0
      },
      children: ["Your Hosting URL:", _br || (_br = /*#__PURE__*/_jsx("br", {})), /*#__PURE__*/_jsxs("code", {
        children: [global.PTUP.ajaxURL, "?action=ptup_hosted"]
      })]
    }), /*#__PURE__*/_jsx("p", {
      children: /*#__PURE__*/_jsx(CopyToClipboard, {
        copyText: "".concat(global.PTUP.ajaxURL, "?action=ptup_hosted"),
        buttonText: "Copy Hosting URL",
        ButtonProps: {
          size: 'small',
          startIcon: _ContentCopyOutlinedI || (_ContentCopyOutlinedI = /*#__PURE__*/_jsx(ContentCopyOutlinedIcon, {}))
        }
      })
    }), _Divider || (_Divider = /*#__PURE__*/_jsx(Divider, {})), _p || (_p = /*#__PURE__*/_jsx("p", {
      children: "Authentication tokens allow you to make certain plugins and themes available to other WordPress sites. It is best practice to use a separate token for each site, so that if one site is compromised you may delete or disable its token without affecting other sites."
    })), /*#__PURE__*/_jsxs("p", {
      children: ["NOTE: You may toggle authentication tokens on and off by clicking on their status icon (", /*#__PURE__*/_jsx(WifiIcon, {
        style: {
          verticalAlign: 'middle'
        }
      }), ")"]
    }), loading ? /*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      },
      children: [_CircularProgress || (_CircularProgress = /*#__PURE__*/_jsx(CircularProgress, {
        size: 48
      })), _p2 || (_p2 = /*#__PURE__*/_jsx("p", {
        children: "Loading Authentication Tokens, please wait..."
      }))]
    }) : authenticationTokens.length === 0 ? /*#__PURE__*/_jsxs("p", {
      style: {
        textAlign: 'center'
      },
      children: ["You have not created any authentication tokens. Try adding one using the (", /*#__PURE__*/_jsx(AddIcon, {
        style: {
          verticalAlign: 'middle'
        }
      }), ") button in the bottom right corner of this screen!"]
    }) : authenticationTokens.map(function (authenticationToken) {
      return /*#__PURE__*/_jsx(AuthenticationToken, {
        authenticationToken: authenticationToken,
        onChange: handleChange,
        onDelete: handleDelete
      }, authenticationToken.value);
    }), /*#__PURE__*/_jsx(AddAuthenticationTokenDialog, {
      onAdd: handleAdd
    }), /*#__PURE__*/_jsxs(Backdrop, {
      open: showBackdrop,
      sx: {
        color: 'common.white',
        zIndex: function zIndex(theme) {
          return theme.zIndex.modal + 1;
        },
        flexDirection: 'column'
      },
      children: [_CircularProgress2 || (_CircularProgress2 = /*#__PURE__*/_jsx(CircularProgress, {
        color: "inherit",
        size: 64
      })), _p3 || (_p3 = /*#__PURE__*/_jsx("p", {
        children: "Saving, please wait..."
      }))]
    })]
  });
};
export default HostingPanel;