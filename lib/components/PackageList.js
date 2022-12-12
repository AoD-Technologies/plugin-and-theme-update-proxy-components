import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControl, FormGroup, FormControlLabel } from '@mui/material';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var INSTALL_LINK_STYLE = {
  display: 'flex',
  justifyContent: 'space-between'
};
var renderInstallLink = function renderInstallLink(_ref) {
  var slug = _ref.slug,
    name = _ref.name,
    title = _ref.title,
    installLink = _ref.installLink;
  return /*#__PURE__*/_jsxs("div", {
    style: INSTALL_LINK_STYLE,
    children: [/*#__PURE__*/_jsx("span", {
      children: title || name
    }), /*#__PURE__*/_jsx("button", {
      className: "button",
      onClick: installLink,
      children: "Install Now"
    })]
  }, slug);
};
var PackageList = function PackageList(_ref2) {
  var onChange = _ref2.onChange,
    packages = _ref2.packages,
    type = _ref2.type,
    fieldName = _ref2.fieldName;
  var renderCheckbox = useCallback(function (_ref3) {
    var id = _ref3.id,
      name = _ref3.name,
      title = _ref3.title,
      selected = _ref3.selected;
    return /*#__PURE__*/_jsx(FormControlLabel, {
      control: /*#__PURE__*/_jsx(Checkbox, {
        name: "".concat(fieldName, "[]"),
        checked: selected,
        onChange: onChange,
        value: id
      }),
      label: title || name
    }, id);
  }, [onChange, fieldName]);
  switch (type) {
    case 'select':
      return /*#__PURE__*/_jsx(FormControl, {
        variant: "standard",
        component: "fieldset",
        children: /*#__PURE__*/_jsx(FormGroup, {
          children: packages.map(renderCheckbox)
        })
      });
    case 'install':
      return /*#__PURE__*/_jsx(FormControl, {
        variant: "standard",
        component: "fieldset",
        children: /*#__PURE__*/_jsx(FormGroup, {
          children: packages.map(renderInstallLink)
        })
      });
    default:
      return null;
  }
};
PackageList.defaultProps = {
  type: 'select',
  fieldName: 'packages'
};
process.env.NODE_ENV !== "production" ? PackageList.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  onChange: PropTypes.func,
  packages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    slug: PropTypes.string,
    selected: PropTypes.bool,
    installLink: PropTypes.func
  }))
} : void 0;
export default PackageList;