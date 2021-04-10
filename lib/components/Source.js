import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

var _ExpandMoreIcon, _SyncIcon, _SyncDisabledIcon, _h, _h2, _h3, _h4, _h5, _h6, _Divider, _SettingsIcon, _DeleteIcon, _FormHelperText, _DialogContent;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useContext, useRef, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, FormGroup, FormControlLabel, FormHelperText, Switch, TextField, Tooltip, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, Settings as SettingsIcon, Sync as SyncIcon, SyncDisabled as SyncDisabledIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import PackageList from './PackageList';
import { WordPressPluginsContext } from '../providers/WordPressPlugins';
import { WordPressThemesContext } from '../providers/WordPressThemes';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var handleStopPropagation = function handleStopPropagation(event) {
  return event.stopPropagation();
};

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      width: '100%'
    },
    dragHandle: {
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: 12
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
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
});

var Source = function Source(_ref) {
  var source = _ref.source,
      index = _ref.index,
      onChange = _ref.onChange,
      onDelete = _ref.onDelete,
      onInstall = _ref.onInstall;
  var classes = useStyles();
  var plugins = useContext(WordPressPluginsContext);
  var themes = useContext(WordPressThemesContext);
  var labelEl = useRef(null);
  var updateURLEl = useRef(null);
  var authenticationTokenEl = useRef(null);
  var skipSSLCertificateChecksEl = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      configureDialogOpen = _useState2[0],
      setConfigureDialogOpen = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      deleteDialogOpen = _useState4[0],
      setDeleteDialogOpen = _useState4[1];

  var idPrefix = useMemo(function () {
    return "source-".concat(encodeURIComponent(source.updateURL));
  }, [source.updateURL]);
  var transformPlugin = useCallback(function (plugin) {
    var _source$selectedPlugi;

    return _objectSpread(_objectSpread({}, plugin), {}, {
      selected: (_source$selectedPlugi = source.selectedPlugins) === null || _source$selectedPlugi === void 0 ? void 0 : _source$selectedPlugi.includes(plugin.id)
    });
  }, [source.selectedPlugins]);
  var transformInstallablePackage = useCallback(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        slug = _ref3[0],
        data = _ref3[1];

    return _objectSpread(_objectSpread({}, data), {}, {
      slug: slug,
      installLink: onInstall
    });
  }, [onInstall]);
  var filterUpdatablePlugins = useCallback(function (_ref4) {
    var id = _ref4.id;
    return source.plugins !== undefined && source.plugins[id] !== undefined;
  }, [source.plugins]);
  var filterInstallablePlugins = useCallback(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
        slug = _ref6[0];

    return !plugins.find(function (_ref7) {
      var id = _ref7.id;
      return id === slug;
    });
  }, [plugins]);
  var updatablePlugins = useMemo(function () {
    return plugins.filter(filterUpdatablePlugins).map(transformPlugin);
  }, [plugins, filterUpdatablePlugins, transformPlugin]);
  var installablePlugins = useMemo(function () {
    return source.plugins ? Object.entries(source.plugins).filter(filterInstallablePlugins).map(transformInstallablePackage) : [];
  }, [source.plugins, filterInstallablePlugins, transformInstallablePackage]);
  var transformTheme = useCallback(function (theme) {
    var _source$selectedTheme;

    return _objectSpread(_objectSpread({}, theme), {}, {
      selected: (_source$selectedTheme = source.selectedThemes) === null || _source$selectedTheme === void 0 ? void 0 : _source$selectedTheme.includes(theme.id)
    });
  }, [source.selectedThemes]);
  var filterUpdatableThemes = useCallback(function (_ref8) {
    var id = _ref8.id;
    return source.themes !== undefined && source.themes[id] !== undefined;
  }, [source.themes]);
  var filterInstallableThemes = useCallback(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 1),
        slug = _ref10[0];

    return !themes.find(function (_ref11) {
      var id = _ref11.id;
      return id === slug;
    });
  }, [themes]);
  var updatableThemes = useMemo(function () {
    return themes.filter(filterUpdatableThemes).map(transformTheme);
  }, [themes, filterUpdatableThemes, transformTheme]);
  var installableThemes = useMemo(function () {
    return source.themes ? Object.entries(source.themes).filter(filterInstallableThemes).map(transformInstallablePackage) : [];
  }, [source.themes, filterInstallableThemes, transformInstallablePackage]);
  var handleChange = useCallback(function (event) {
    onChange(event, source);
  }, [source, onChange]);
  var handleConfigure = useCallback(function (event) {
    setConfigureDialogOpen(false);
    onChange(event, source, {
      label: labelEl.current.value,
      updateURL: updateURLEl.current.value,
      authenticationToken: authenticationTokenEl.current.value,
      skipSSLCertificateChecks: skipSSLCertificateChecksEl.current.checked
    });
  }, [source, onChange]);
  var handleDelete = useCallback(function (event) {
    setDeleteDialogOpen(false);
    onDelete(source);
  }, [source, onDelete]);
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
    handleChange(event, source);
    return false;
  }, [handleChange, source]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(ExpansionPanel, {
      children: [/*#__PURE__*/_jsxs(ExpansionPanelSummary, {
        expandIcon: _ExpandMoreIcon || (_ExpandMoreIcon = /*#__PURE__*/_jsx(ExpandMoreIcon, {})),
        "aria-controls": "".concat(idPrefix, "-content"),
        id: "".concat(idPrefix, "-header"),
        children: [/*#__PURE__*/_jsx("div", {
          className: classes.dragHandle,
          onClick: handleStopPropagation,
          onFocus: handleStopPropagation
        }), /*#__PURE__*/_jsx(Tooltip, {
          title: source.enabled ? 'Enabled' : 'Disabled',
          children: /*#__PURE__*/_jsx("div", {
            className: classes.dragHandle,
            onClick: handleToggle,
            onFocus: handleStopPropagation,
            children: source.enabled ? _SyncIcon || (_SyncIcon = /*#__PURE__*/_jsx(SyncIcon, {})) : _SyncDisabledIcon || (_SyncDisabledIcon = /*#__PURE__*/_jsx(SyncDisabledIcon, {}))
          })
        }), source.label ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("div", {
            className: classes.labelColumn,
            children: /*#__PURE__*/_jsx(Typography, {
              className: classes.heading,
              children: source.label
            })
          }), /*#__PURE__*/_jsx("div", {
            className: classes.urlColumn,
            children: /*#__PURE__*/_jsx(Typography, {
              className: classes.secondaryHeading,
              children: source.updateURL
            })
          })]
        }) : /*#__PURE__*/_jsx(Typography, {
          className: classes.heading,
          children: source.updateURL
        })]
      }), /*#__PURE__*/_jsxs(ExpansionPanelDetails, {
        className: classes.details,
        children: [!updatablePlugins.length && !installablePlugins.length ? _h || (_h = /*#__PURE__*/_jsx("h4", {
          children: "No Plugins Available"
        })) : null, updatablePlugins.length ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [_h2 || (_h2 = /*#__PURE__*/_jsx("h4", {
            children: "Updatable Plugins"
          })), /*#__PURE__*/_jsx(PackageList, {
            fieldName: "plugins",
            onChange: handleChange,
            packages: updatablePlugins
          })]
        }) : null, installablePlugins.length ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [_h3 || (_h3 = /*#__PURE__*/_jsx("h4", {
            children: "Installable Plugins"
          })), /*#__PURE__*/_jsx(PackageList, {
            type: "install",
            onChange: handleChange,
            packages: installablePlugins
          })]
        }) : null, !updatableThemes.length && !installableThemes.length ? _h4 || (_h4 = /*#__PURE__*/_jsx("h4", {
          children: "No Themes Available"
        })) : null, updatableThemes.length ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [_h5 || (_h5 = /*#__PURE__*/_jsx("h4", {
            children: "Updatable Themes"
          })), /*#__PURE__*/_jsx(PackageList, {
            fieldName: "themes",
            onChange: handleChange,
            packages: updatableThemes
          })]
        }) : null, installableThemes.length ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [_h6 || (_h6 = /*#__PURE__*/_jsx("h4", {
            children: "Installable Themes"
          })), /*#__PURE__*/_jsx(PackageList, {
            type: "install",
            onChange: handleChange,
            packages: installableThemes
          })]
        }) : null]
      }), _Divider || (_Divider = /*#__PURE__*/_jsx(Divider, {})), /*#__PURE__*/_jsxs(ExpansionPanelActions, {
        children: [/*#__PURE__*/_jsx(Button, {
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
        children: "Configure Source"
      }), /*#__PURE__*/_jsxs(DialogContent, {
        children: [/*#__PURE__*/_jsx(TextField, {
          autoFocus: true,
          inputRef: labelEl,
          size: "small",
          margin: "normal",
          variant: "outlined",
          id: "label",
          label: "Label",
          type: "text",
          defaultValue: source.label,
          fullWidth: true
        }), /*#__PURE__*/_jsx(TextField, {
          inputRef: updateURLEl,
          size: "small",
          margin: "normal",
          variant: "outlined",
          id: "updateURL",
          label: "URL",
          type: "url",
          defaultValue: source.updateURL,
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
          defaultValue: source.authenticationToken,
          required: true,
          fullWidth: true
        }), /*#__PURE__*/_jsxs(FormControl, {
          component: "fieldset",
          children: [/*#__PURE__*/_jsx(FormGroup, {
            children: /*#__PURE__*/_jsx(FormControlLabel, {
              value: "skipSSLCertificateChecks",
              control: /*#__PURE__*/_jsx(Switch, {
                inputRef: skipSSLCertificateChecksEl,
                defaultChecked: source.skipSSLCertificateChecks
              }),
              label: "Skip SSL Certificate Checks"
            })
          }), _FormHelperText || (_FormHelperText = /*#__PURE__*/_jsxs(FormHelperText, {
            children: ["Use this if the source site has an insecure SSL certificate", /*#__PURE__*/_jsx("br", {}), "NOTE: You should install a secure SSL certificate on the source site instead!"]
          }))]
        })]
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
        children: "Are you sure you want to permanently delete this source?"
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

process.env.NODE_ENV !== "production" ? Source.propTypes = {
  source: PropTypes.shape({
    label: PropTypes.string,
    updateURL: PropTypes.string.isRequired,
    authenticationToken: PropTypes.string.isRequired,
    skipSSLCertificateChecks: PropTypes.bool,
    enabled: PropTypes.bool,
    plugins: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      slug: PropTypes.string,
      selected: PropTypes.bool
    })),
    themes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      slug: PropTypes.string,
      selected: PropTypes.bool
    })),
    selectedPlugins: PropTypes.arrayOf(PropTypes.string),
    selectedThemes: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInstall: PropTypes.func.isRequired
} : void 0;
export default Source;