import { useContext } from 'react'

import { useTheme } from '@mui/material/styles'

import HostingPanel from './HostingPanel'
import SourcesPanel from './SourcesPanel'
import TabPanel from './TabPanel'

import { VisibleTabContext } from '../providers/VisibleTab'

const Tabs = () => {
  const theme = useTheme()

  const visibleTab = useContext(VisibleTabContext)

  return (
    <>
      <TabPanel value={visibleTab} index={0} dir={theme.direction}>
        <HostingPanel />
      </TabPanel>
      <TabPanel value={visibleTab} index={1} dir={theme.direction}>
        <SourcesPanel />
      </TabPanel>
    </>
  )
}

export default Tabs
