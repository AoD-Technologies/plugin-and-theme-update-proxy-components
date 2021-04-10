import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

var _SpeedDialIcon, _AddIcon, _RefreshIcon, _RefreshIcon2;

import { useState, useContext, useCallback, useEffect } from 'react';
import { SpeedDial as MUISpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { Add as AddIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { AddAuthenticationTokenDialogOpenSetterContext } from '../providers/AddAuthenticationTokenDialogOpen';
import { AddSourceDialogOpenSetterContext } from '../providers/AddSourceDialogOpen';
import { SnackBarShowMessageContext } from '../providers/SnackBar';
import { VisibleTabContext } from '../providers/VisibleTab';
import { WordPressPluginsSetterContext } from '../providers/WordPressPlugins';
import { WordPressThemesSetterContext } from '../providers/WordPressThemes';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      position: 'fixed',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(4),
        right: theme.spacing(2)
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2)
      }
    }
  };
});

var SpeedDial = function SpeedDial() {
  var classes = useStyles();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      speedDialOpen = _useState2[0],
      setSpeedDialOpen = _useState2[1];

  var setAddAuthenticationTokenDialogOpen = useContext(AddAuthenticationTokenDialogOpenSetterContext);
  var setAddSourceDialogOpen = useContext(AddSourceDialogOpenSetterContext);
  var showSnackBarMessage = useContext(SnackBarShowMessageContext);
  var visibleTab = useContext(VisibleTabContext);
  var setWordPressPlugins = useContext(WordPressPluginsSetterContext);
  var setWordPressThemes = useContext(WordPressThemesSetterContext);
  var handleAdd = useCallback(function () {
    switch (visibleTab) {
      case 0:
        setAddAuthenticationTokenDialogOpen(true);
        break;

      case 1:
        setAddSourceDialogOpen(true);
        break;

      default:
        break;
    }
  }, [visibleTab, setAddAuthenticationTokenDialogOpen, setAddSourceDialogOpen]);
  var handleRefreshPlugins = useCallback(function () {
    if (showSnackBarMessage) {
      setSpeedDialOpen(false);
      global.fetch("".concat(global.PTUP.ajaxURL, "?action=ptup_available_plugins")).then(function (res) {
        return res.json();
      }).then(function (wordPressPlugins) {
        setWordPressPlugins(wordPressPlugins);
      })["catch"](function (e) {
        showSnackBarMessage("Failed to load available WordPress plugins!".concat(e.message ? " Reason: ".concat(e.message) : ''), 'error');
      });
    }
  }, [showSnackBarMessage, setWordPressPlugins]);
  var handleRefreshThemes = useCallback(function () {
    if (showSnackBarMessage) {
      setSpeedDialOpen(false);
      global.fetch("".concat(global.PTUP.ajaxURL, "?action=ptup_available_themes")).then(function (res) {
        return res.json();
      }).then(function (wordPressThemes) {
        setWordPressThemes(wordPressThemes);
      })["catch"](function (e) {
        showSnackBarMessage("Failed to load available WordPress themes!".concat(e.message ? " Reason: ".concat(e.message) : ''), 'error');
      });
    }
  }, [showSnackBarMessage, setWordPressThemes]);
  var handleSpeedDialOpen = useCallback(function () {
    setSpeedDialOpen(true);
  }, []);
  var handleSpeedDialClose = useCallback(function () {
    setSpeedDialOpen(false);
  }, []);
  useEffect(function () {
    handleRefreshPlugins();
    handleRefreshThemes();
  }, [handleRefreshPlugins, handleRefreshThemes]);
  return /*#__PURE__*/_jsxs(MUISpeedDial, {
    ariaLabel: "Available Actions",
    className: classes.root,
    hidden: false,
    icon: _SpeedDialIcon || (_SpeedDialIcon = /*#__PURE__*/_jsx(SpeedDialIcon, {})),
    onClose: handleSpeedDialClose,
    onOpen: handleSpeedDialOpen,
    open: speedDialOpen,
    direction: "up",
    children: [/*#__PURE__*/_jsx(SpeedDialAction, {
      icon: _AddIcon || (_AddIcon = /*#__PURE__*/_jsx(AddIcon, {})),
      tooltipTitle: "Add\xA0".concat(visibleTab === 0 ? 'Authentication\xa0Token' : 'Source'),
      tooltipOpen: true,
      onClick: handleAdd
    }), /*#__PURE__*/_jsx(SpeedDialAction, {
      icon: _RefreshIcon || (_RefreshIcon = /*#__PURE__*/_jsx(RefreshIcon, {})),
      tooltipTitle: "Refresh\xA0Themes",
      tooltipOpen: true,
      onClick: handleRefreshThemes
    }), /*#__PURE__*/_jsx(SpeedDialAction, {
      icon: _RefreshIcon2 || (_RefreshIcon2 = /*#__PURE__*/_jsx(RefreshIcon, {})),
      tooltipTitle: "Refresh\xA0Plugins",
      tooltipOpen: true,
      onClick: handleRefreshPlugins
    })]
  });
};

export default SpeedDial;