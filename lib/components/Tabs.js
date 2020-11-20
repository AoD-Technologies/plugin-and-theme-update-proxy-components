import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import HostingPanel from './HostingPanel';
import SourcesPanel from './SourcesPanel';
import TabPanel from './TabPanel';
import { VisibleTabContext } from '../providers/VisibleTab';

var _ref = /*#__PURE__*/_jsx(HostingPanel, {});

var _ref2 = /*#__PURE__*/_jsx(SourcesPanel, {});

var Tabs = function Tabs() {
  var theme = useTheme();
  var visibleTab = useContext(VisibleTabContext);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(TabPanel, {
      value: visibleTab,
      index: 0,
      dir: theme.direction,
      children: _ref
    }), /*#__PURE__*/_jsx(TabPanel, {
      value: visibleTab,
      index: 1,
      dir: theme.direction,
      children: _ref2
    })]
  });
};

export default Tabs;