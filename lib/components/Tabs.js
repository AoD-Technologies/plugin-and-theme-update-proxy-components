var _HostingPanel, _SourcesPanel;
import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import HostingPanel from './HostingPanel';
import SourcesPanel from './SourcesPanel';
import TabPanel from './TabPanel';
import { VisibleTabContext } from '../providers/VisibleTab';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Tabs = function Tabs() {
  var theme = useTheme();
  var visibleTab = useContext(VisibleTabContext);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(TabPanel, {
      value: visibleTab,
      index: 0,
      dir: theme.direction,
      children: _HostingPanel || (_HostingPanel = /*#__PURE__*/_jsx(HostingPanel, {}))
    }), /*#__PURE__*/_jsx(TabPanel, {
      value: visibleTab,
      index: 1,
      dir: theme.direction,
      children: _SourcesPanel || (_SourcesPanel = /*#__PURE__*/_jsx(SourcesPanel, {}))
    })]
  });
};
export default Tabs;