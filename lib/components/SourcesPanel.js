import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useState, useContext, useCallback, useEffect } from 'react';
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Sync as SyncIcon } from '@material-ui/icons';
import AddSourceDialog from './AddSourceDialog';
import Source from './Source';
import { AddSourceDialogOpenSetterContext } from '../providers/AddSourceDialogOpen';
import { SnackBarShowMessageContext } from '../providers/SnackBar';
import { WordPressPluginsContext } from '../providers/WordPressPlugins';
import { WordPressThemesContext } from '../providers/WordPressThemes';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useStyles = makeStyles(function (theme) {
  return {
    backdrop: {
      color: theme.palette.common.white,
      zIndex: theme.zIndex.modal + 1,
      flexDirection: 'column'
    }
  };
});

var _ref = /*#__PURE__*/_jsx(Divider, {});

var _ref2 = /*#__PURE__*/_jsx("br", {});

var _ref3 = /*#__PURE__*/_jsx("a", {
  href: "https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&utm_medium=software&utm_term=pro-tip-link&utm_content=settings&utm_campaign=wordpress-ad",
  target: "_blank",
  rel: "noopener",
  children: "Upgrade to Plugin and Theme Update Proxy Premium"
});

var _ref4 = /*#__PURE__*/_jsx(CircularProgress, {
  size: 48
});

var _ref5 = /*#__PURE__*/_jsx("p", {
  children: "Loading Source, please wait..."
});

var _ref6 = /*#__PURE__*/_jsx("br", {});

var _ref7 = /*#__PURE__*/_jsx("a", {
  href: "https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&utm_medium=software&utm_term=single-source-site-link&utm_content=settings&utm_campaign=wordpress-ad",
  target: "_blank",
  rel: "noopener",
  children: "Upgrade to Plugin and Theme Update Proxy Premium"
});

var _ref8 = /*#__PURE__*/_jsx("br", {});

var _ref9 = /*#__PURE__*/_jsx("a", {
  href: "https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&utm_medium=software&utm_term=single-updatable-plugin-or-theme-link&utm_content=settings&utm_campaign=wordpress-ad",
  target: "_blank",
  rel: "noopener",
  children: "Upgrade to Plugin and Theme Update Proxy Premium"
});

var _ref10 = /*#__PURE__*/_jsx("br", {});

var _ref11 = /*#__PURE__*/_jsx("br", {});

var _ref12 = /*#__PURE__*/_jsx("a", {
  href: "https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&utm_medium=software&utm_term=plugin-and-theme-installation-link&utm_content=settings&utm_campaign=wordpress-ad",
  target: "_blank",
  rel: "noopener",
  children: "Upgrade to Plugin and Theme Update Proxy Premium"
});

var _ref13 = /*#__PURE__*/_jsx(CircularProgress, {
  color: "inherit",
  size: 64
});

var _ref14 = /*#__PURE__*/_jsx("p", {
  children: "Saving, please wait..."
});

var SourcesPanel = function SourcesPanel() {
  var classes = useStyles();

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      source = _useState4[0],
      setSource = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showBackdrop = _useState6[0],
      setShowBackdrop = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      singleSourceDialogOpen = _useState8[0],
      setSingleSourceDialogOpen = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      singleUpdatableDialogOpen = _useState10[0],
      setSingleUpdatableDialogOpen = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      noInstallationDialogOpen = _useState12[0],
      setNoInstallationDialogOpen = _useState12[1];

  var setAddSourceDialogOpen = useContext(AddSourceDialogOpenSetterContext);
  var showSnackBarMessage = useContext(SnackBarShowMessageContext);
  var plugins = useContext(WordPressPluginsContext);
  var themes = useContext(WordPressThemesContext);
  var handleAddSourceDialogClose = useCallback(function () {
    setAddSourceDialogOpen(false);
  }, [setAddSourceDialogOpen]);
  useEffect(function () {
    if (showSnackBarMessage) {
      global.fetch("".concat(global.PTUP.ajaxURL, "?action=ptup_sources")).then(function (res) {
        return res.json();
      }).then(setSource)["catch"](function (e) {
        showSnackBarMessage("Failed to load source!".concat(e.message ? " Reason: ".concat(e.message) : ''), 'error');
      })["finally"](function () {
        setLoading(false);
      });
    }
  }, [showSnackBarMessage]);
  var saveSource = useCallback(function (newSource) {
    if (showSnackBarMessage) {
      setShowBackdrop(true);
      global.fetch("".concat(global.PTUP.ajaxURL, "?action=ptup_sources"), {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newSource)
      }).then(function (res) {
        if (res.status !== 200) {
          throw new Error();
        }

        return res.json();
      }).then(function (fullSource) {
        setSource(fullSource);
        showSnackBarMessage('Source saved successfully!', 'success');
        handleAddSourceDialogClose();
      })["catch"](function (e) {
        showSnackBarMessage("Failed to save source!".concat(e.message ? " Reason: ".concat(e.message) : ''), 'error');
      })["finally"](function () {
        setShowBackdrop(false);
      });
    }
  }, [handleAddSourceDialogClose, showSnackBarMessage]);
  var handleAdd = useCallback(function (newSource) {
    if (source === null) {
      saveSource(newSource);
    } else {
      setSingleSourceDialogOpen(true);
    }
  }, [saveSource, source]);
  var handleSingleSourceDialogClose = useCallback(function () {
    setSingleSourceDialogOpen(false);
  }, []);
  var handleSingleUpdatableDialogClose = useCallback(function () {
    setSingleUpdatableDialogOpen(false);
  }, []);
  var handleInstall = useCallback(function () {
    setNoInstallationDialogOpen(true);
  }, []);
  var handleNoInstallationDialogClose = useCallback(function () {
    setNoInstallationDialogOpen(false);
  }, []);
  var handleChange = useCallback(function (event, update, newValues) {
    var newSelectedPlugins = update.selectedPlugins ? Array.from(update.selectedPlugins).filter(function (selectedPlugin) {
      return plugins.some(function (plugin) {
        return plugin.id === selectedPlugin;
      });
    }) : [];
    var newSelectedThemes = update.selectedThemes ? Array.from(update.selectedThemes).filter(function (selectedTheme) {
      return themes.some(function (theme) {
        return theme.id === selectedTheme;
      });
    }) : [];

    if (event.target.name === 'plugins[]') {
      if (event.target.checked) {
        if (newSelectedPlugins.includes(event.target.value)) {
          return;
        }

        if (newSelectedPlugins.length || newSelectedThemes.length) {
          setSingleUpdatableDialogOpen(true);
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

      var newSource = _objectSpread(_objectSpread({}, source), {}, {
        selectedPlugins: newSelectedPlugins
      });

      saveSource(newSource);
    } else if (event.target.name === 'themes[]') {
      if (event.target.checked) {
        if (newSelectedThemes.includes(event.target.value)) {
          return;
        }

        if (newSelectedPlugins.length || newSelectedThemes.length) {
          setSingleUpdatableDialogOpen(true);
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

      var _newSource = _objectSpread(_objectSpread({}, source), {}, {
        selectedThemes: newSelectedThemes
      });

      saveSource(_newSource);
    } else if (newValues) {
      var _newSource2 = _objectSpread(_objectSpread({}, source), newValues);

      saveSource(_newSource2);
    } else {
      var _newSource3 = _objectSpread(_objectSpread({}, source), {}, {
        enabled: !source.enabled
      });

      saveSource(_newSource3);
    }
  }, [plugins, themes, source, saveSource]);
  var handleDelete = useCallback(function () {
    saveSource(null);
  }, [saveSource]);
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("p", {
      style: {
        marginTop: 0
      },
      children: "The source WordPress site will be checked for updates for your plugins and themes."
    }), /*#__PURE__*/_jsxs("p", {
      children: ["NOTE: You may toggle the source site on and off by clicking on its status icon (", /*#__PURE__*/_jsx(SyncIcon, {
        style: {
          verticalAlign: 'middle'
        }
      }), ")"]
    }), _ref, /*#__PURE__*/_jsxs("p", {
      children: ["PRO TIP: Do you have multiple plugins and themes to update, or multiple source sites from which you would like to update? Or perhaps some plugins and themes you would like to install directly from those sites?", _ref2, _ref3, "\xA0and enjoy unlimited updatable plugins and themes, unlimited source sites, as well as installation of new plugins and themes directly from source sites!"]
    }), loading ? /*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      },
      children: [_ref4, _ref5]
    }) : source === null ? /*#__PURE__*/_jsxs("p", {
      style: {
        textAlign: 'center'
      },
      children: ["You have not specified an update source. Try adding one using the (", /*#__PURE__*/_jsx(AddIcon, {
        style: {
          verticalAlign: 'middle'
        }
      }), ") button in the bottom right corner of this screen!"]
    }) : /*#__PURE__*/_jsx(Source, {
      source: source,
      index: 0,
      onChange: handleChange,
      onDelete: handleDelete,
      onInstall: handleInstall
    }), /*#__PURE__*/_jsx(AddSourceDialog, {
      onAdd: handleAdd
    }), /*#__PURE__*/_jsxs(Dialog, {
      open: singleSourceDialogOpen,
      onClose: handleSingleSourceDialogClose,
      children: [/*#__PURE__*/_jsxs(DialogContent, {
        children: ["Sorry, the free version of Plugin and Theme Update Proxy is limited to a single source site.", _ref6, _ref7, "\xA0and enjoy unlimited source sites!"]
      }), /*#__PURE__*/_jsx(DialogActions, {
        children: /*#__PURE__*/_jsx(Button, {
          onClick: handleSingleSourceDialogClose,
          color: "primary",
          children: "Close"
        })
      })]
    }), /*#__PURE__*/_jsxs(Dialog, {
      open: singleUpdatableDialogOpen,
      onClose: handleSingleUpdatableDialogClose,
      children: [/*#__PURE__*/_jsxs(DialogContent, {
        children: ["Sorry, the free version of Plugin and Theme Update Proxy is limited to a single updatable plugin or theme.", _ref8, _ref9, "\xA0and enjoy unlimited updatable plugins and themes!", _ref10, "To select a different plugin or theme for updates with the free version, please deselect the currently selected plugin or theme first."]
      }), /*#__PURE__*/_jsx(DialogActions, {
        children: /*#__PURE__*/_jsx(Button, {
          onClick: handleSingleUpdatableDialogClose,
          color: "primary",
          children: "Close"
        })
      })]
    }), /*#__PURE__*/_jsxs(Dialog, {
      open: noInstallationDialogOpen,
      onClose: handleNoInstallationDialogClose,
      children: [/*#__PURE__*/_jsxs(DialogContent, {
        children: ["Sorry, the free version of Plugin and Theme Update Proxy does not support plugin or theme installation from source sites.", _ref11, _ref12, "\xA0and enjoy installation of new plugins and themes directly from source sites!"]
      }), /*#__PURE__*/_jsx(DialogActions, {
        children: /*#__PURE__*/_jsx(Button, {
          onClick: handleNoInstallationDialogClose,
          color: "primary",
          children: "Close"
        })
      })]
    }), /*#__PURE__*/_jsxs(Backdrop, {
      open: showBackdrop,
      classes: {
        root: classes.backdrop
      },
      children: [_ref13, _ref14]
    })]
  });
};

export default SourcesPanel;