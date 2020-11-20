import PropTypes from 'prop-types'

import {
  Box,
  Typography
} from '@material-ui/core'

const TabPanel = ({ children, value, index, ...other }) => (
  <Typography
    component='div'
    role='tabpanel'
    hidden={value !== index}
    id={`action-tabpanel-${index}`}
    aria-labelledby={`action-tab-${index}`}
    {...other}
  >
    <Box p={3}>{children}</Box>
  </Typography>
)

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

export default TabPanel
