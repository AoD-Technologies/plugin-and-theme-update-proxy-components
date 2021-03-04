import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import 'whatwg-fetch';
import 'typeface-roboto';
import { jsx as _jsx } from "react/jsx-runtime";
var adminColorDetector = document.createElement('a');
adminColorDetector.style.display = 'none';
document.getElementById('adminmenu').appendChild(adminColorDetector);
var adminColorDetectorStyle = global.getComputedStyle(adminColorDetector);
var palette = {
  primary: {},
  secondary: {}
};
adminColorDetector.setAttribute('class', 'button-primary');
palette.primary.main = adminColorDetectorStyle.backgroundColor;
adminColorDetector.setAttribute('class', 'awaiting-mod');
palette.secondary.main = adminColorDetectorStyle.backgroundColor;
adminColorDetector.remove();
var muiTheme = createMuiTheme({
  palette: palette,
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '18.5px 14px !important'
      },
      inputMarginDense: {
        paddingBottom: '10.5px !important',
        paddingTop: '10.5px !important'
      }
    },
    MuiInputBase: {
      input: {
        background: 'none !important',
        backgroundColor: 'none !important',
        border: '0 !important',
        borderRadius: '0 !important',
        boxShadow: 'none !important',
        color: 'currentColor !important',
        lineHeight: 'inherit !important',
        minHeight: '0 !important',
        outline: '0 !important'
      }
    }
  }
});

var ThemeProvider = function ThemeProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_jsx(MUIThemeProvider, {
    theme: muiTheme,
    children: children
  });
};

process.env.NODE_ENV !== "production" ? ThemeProvider.propTypes = {
  children: PropTypes.node
} : void 0;
export default ThemeProvider;