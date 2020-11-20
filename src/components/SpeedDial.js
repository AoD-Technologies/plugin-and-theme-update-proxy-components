import { useState, useContext, useCallback, useEffect } from 'react'

import {
  SpeedDial as MUISpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@material-ui/lab'

import {
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

import { AddAuthenticationTokenDialogOpenSetterContext } from '../providers/AddAuthenticationTokenDialogOpen'
import { AddSourceDialogOpenSetterContext } from '../providers/AddSourceDialogOpen'
import { SnackBarShowMessageContext } from '../providers/SnackBar'
import { VisibleTabContext } from '../providers/VisibleTab'
import { WordPressPluginsSetterContext } from '../providers/WordPressPlugins'
import { WordPressThemesSetterContext } from '../providers/WordPressThemes'

const useStyles = makeStyles((theme) => ({
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
}))

const SpeedDial = () => {
  const classes = useStyles()

  const [speedDialOpen, setSpeedDialOpen] = useState(false)

  const setAddAuthenticationTokenDialogOpen = useContext(
    AddAuthenticationTokenDialogOpenSetterContext
  )
  const setAddSourceDialogOpen = useContext(
    AddSourceDialogOpenSetterContext
  )
  const showSnackBarMessage = useContext(SnackBarShowMessageContext)
  const visibleTab = useContext(VisibleTabContext)
  const setWordPressPlugins = useContext(WordPressPluginsSetterContext)
  const setWordPressThemes = useContext(WordPressThemesSetterContext)

  const handleAdd = useCallback(() => {
    switch (visibleTab) {
      case 0:
        setAddAuthenticationTokenDialogOpen(true)
        break
      case 1:
        setAddSourceDialogOpen(true)
        break
      default:
        break
    }
  }, [visibleTab, setAddAuthenticationTokenDialogOpen, setAddSourceDialogOpen])

  const handleRefreshPlugins = useCallback(() => {
    if (showSnackBarMessage) {
      setSpeedDialOpen(false)

      global
        .fetch(`${global.PTUP.ajaxURL}?action=ptup_available_plugins`)
        .then((res) => res.json())
        .then((wordPressPlugins) => {
          setWordPressPlugins(wordPressPlugins)
        })
        .catch((e) => {
          showSnackBarMessage(
            `Failed to load available WordPress plugins!${
              e.message ? ` Reason: ${e.message}` : ''
            }`,
            'error'
          )
        })
    }
  }, [showSnackBarMessage, setWordPressPlugins])

  const handleRefreshThemes = useCallback(() => {
    if (showSnackBarMessage) {
      setSpeedDialOpen(false)

      global
        .fetch(`${global.PTUP.ajaxURL}?action=ptup_available_themes`)
        .then((res) => res.json())
        .then((wordPressThemes) => {
          setWordPressThemes(wordPressThemes)
        })
        .catch((e) => {
          showSnackBarMessage(
            `Failed to load available WordPress themes!${
              e.message ? ` Reason: ${e.message}` : ''
            }`,
            'error'
          )
        })
    }
  }, [showSnackBarMessage, setWordPressThemes])

  const handleSpeedDialOpen = useCallback(() => {
    setSpeedDialOpen(true)
  }, [])

  const handleSpeedDialClose = useCallback(() => {
    setSpeedDialOpen(false)
  }, [])

  useEffect(() => {
    handleRefreshPlugins()
    handleRefreshThemes()
  }, [handleRefreshPlugins, handleRefreshThemes])

  return (
    <MUISpeedDial
      ariaLabel='Available Actions'
      className={classes.root}
      hidden={false}
      icon={<SpeedDialIcon />}
      onClose={handleSpeedDialClose}
      onOpen={handleSpeedDialOpen}
      open={speedDialOpen}
      direction='up'
    >
      <SpeedDialAction
        icon={<AddIcon />}
        tooltipTitle={`Add\xa0${
          visibleTab === 0 ? 'Authentication\xa0Token' : 'Source'
        }`}
        tooltipOpen
        onClick={handleAdd}
      />
      <SpeedDialAction
        icon={<RefreshIcon />}
        tooltipTitle='Refresh&nbsp;Themes'
        tooltipOpen
        onClick={handleRefreshThemes}
      />
      <SpeedDialAction
        icon={<RefreshIcon />}
        tooltipTitle='Refresh&nbsp;Plugins'
        tooltipOpen
        onClick={handleRefreshPlugins}
      />
    </MUISpeedDial>
  )
}

export default SpeedDial
