import { useContext, useCallback } from 'react';
import { AppBar as MUIAppBar, Tabs, Tab } from '@material-ui/core';
import { VisibleTabContext, VisibleTabSetterContext } from '../providers/VisibleTab';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

var _ref = /*#__PURE__*/_jsx(Tab, {
  label: "Hosting",
  id: "action-tab-0",
  "aria-controls": "action-tabpanel-0"
});

var _ref2 = /*#__PURE__*/_jsx(Tab, {
  label: "Sources",
  id: "action-tab-1",
  "aria-controls": "action-tabpanel-1"
});

var AppBar = function AppBar() {
  var visibleTab = useContext(VisibleTabContext);
  var setVisibleTab = useContext(VisibleTabSetterContext);
  var handleChange = useCallback(function (event, newValue) {
    setVisibleTab(newValue);
  }, [setVisibleTab]);
  return /*#__PURE__*/_jsx(MUIAppBar, {
    position: "static",
    color: "default",
    children: /*#__PURE__*/_jsxs(Tabs, {
      value: visibleTab,
      onChange: handleChange,
      indicatorColor: "primary",
      textColor: "primary",
      children: [_ref, _ref2]
    })
  });
};

export default AppBar;