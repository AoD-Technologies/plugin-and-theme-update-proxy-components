import { useContext, useCallback } from 'react'

import {
  AppBar as MUIAppBar,
  Tabs,
  Tab
} from '@material-ui/core'

import {
  VisibleTabContext,
  VisibleTabSetterContext
} from '../providers/VisibleTab'

const AppBar = () => {
  const visibleTab = useContext(VisibleTabContext)
  const setVisibleTab = useContext(VisibleTabSetterContext)

  const handleChange = useCallback(
    (event, newValue) => {
      setVisibleTab(newValue)
    },
    [setVisibleTab]
  )

  return (
    <MUIAppBar position='static' color='default'>
      <Tabs
        value={visibleTab}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab
          label='Hosting'
          id='action-tab-0'
          aria-controls='action-tabpanel-0'
        />
        <Tab
          label='Sources'
          id='action-tab-1'
          aria-controls='action-tabpanel-1'
        />
      </Tabs>
    </MUIAppBar>
  )
}

export default AppBar
