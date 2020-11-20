import PropTypes from 'prop-types'

import {
  createMuiTheme,
  ThemeProvider as MUIThemeProvider
} from '@material-ui/core/styles'

import 'whatwg-fetch'

import 'typeface-roboto'

const adminColorDetector = document.createElement('a')
adminColorDetector.style.display = 'none'
document.getElementById('adminmenu').appendChild(adminColorDetector)
const adminColorDetectorStyle = global.getComputedStyle(adminColorDetector)

const palette = {
  primary: {},
  secondary: {}
}

adminColorDetector.setAttribute('class', 'button-primary')
palette.primary.main = adminColorDetectorStyle.backgroundColor

adminColorDetector.setAttribute('class', 'awaiting-mod')
palette.secondary.main = adminColorDetectorStyle.backgroundColor

adminColorDetector.remove()

const muiTheme = createMuiTheme({
  palette,
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
})

const ThemeProvider = ({ children }) => (
  <MUIThemeProvider theme={muiTheme}>
    {children}
  </MUIThemeProvider>
)

ThemeProvider.propTypes = {
  children: PropTypes.node
}

export default ThemeProvider
