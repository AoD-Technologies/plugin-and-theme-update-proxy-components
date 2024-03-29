import { useContext, useRef, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'

import {
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon
} from '@mui/icons-material'

import { styled } from '@mui/material/styles'

import CopyToClipboard from './CopyToClipboard'
import PackageList from './PackageList'

import { WordPressPluginsContext } from '../providers/WordPressPlugins'
import { WordPressThemesContext } from '../providers/WordPressThemes'

const Div = styled('div')``

const handleStopPropagation = (event) => event.stopPropagation()

const styles = {
  root: {
    width: '100%'
  },
  dragHandle: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: 12
  },
  heading: {
    fontSize: theme => theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme => theme.typography.pxToRem(15),
    color: 'text.secondary'
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    flexDirection: 'column'
  },
  labelColumn: {
    flexBasis: '25%',
    display: 'flex',
    alignItems: 'center'
  },
  urlColumn: {
    flexBasis: '75%',
    display: 'flex',
    alignItems: 'center'
  }
}

const AuthenticationToken = ({ authenticationToken, onChange, onDelete }) => {
  const plugins = useContext(WordPressPluginsContext)
  const themes = useContext(WordPressThemesContext)

  const labelEl = useRef(null)

  const [configureDialogOpen, setConfigureDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const idPrefix = useMemo(
    () =>
      `authenticationToken-${global.encodeURIComponent(
        authenticationToken.value
      )}`,
    [authenticationToken.value]
  )

  const transformPlugin = useCallback(
    (plugin) => {
      return {
        ...plugin,
        selected: authenticationToken.selectedPlugins?.includes(plugin.id)
      }
    },
    [authenticationToken.selectedPlugins]
  )

  const transformTheme = useCallback(
    (theme) => {
      return {
        ...theme,
        selected: authenticationToken.selectedThemes?.includes(theme.id)
      }
    },
    [authenticationToken.selectedThemes]
  )

  const handleChange = useCallback(
    (event) => {
      onChange(event, authenticationToken)
    },
    [authenticationToken, onChange]
  )

  const handleConfigure = useCallback(
    (event) => {
      setConfigureDialogOpen(false)
      console.log(labelEl.current.value)
      onChange(event, authenticationToken, {
        label: labelEl.current.value
      })
    },
    [authenticationToken, onChange]
  )

  const handleDelete = useCallback(
    (event) => {
      setDeleteDialogOpen(false)
      onDelete(authenticationToken)
    },
    [authenticationToken, onDelete]
  )

  const handleConfigureDialogOpen = useCallback(() => {
    setConfigureDialogOpen(true)
  }, [])

  const handleConfigureDialogClose = useCallback(() => {
    setConfigureDialogOpen(false)
  }, [])

  const handleDeleteDialogOpen = useCallback(() => {
    setDeleteDialogOpen(true)
  }, [])

  const handleDeleteDialogClose = useCallback(() => {
    setDeleteDialogOpen(false)
  }, [])

  const handleToggle = useCallback(
    (event) => {
      handleStopPropagation(event)
      handleChange(event, authenticationToken)
      return false
    },
    [handleChange, authenticationToken]
  )

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${idPrefix}-content`}
          id={`${idPrefix}-header`}
        >
          <Tooltip title={authenticationToken.enabled ? 'Enabled' : 'Disabled'}>
            <Div
              sx={styles.dragHandle}
              onClick={handleToggle}
              onFocus={handleStopPropagation}
            >
              {authenticationToken.enabled ? <WifiIcon /> : <WifiOffIcon />}
            </Div>
          </Tooltip>
          {authenticationToken.label ? (
            <>
              <Div sx={styles.labelColumn}>
                <Typography sx={styles.heading}>
                  {authenticationToken.label}
                </Typography>
              </Div>
              <Div sx={styles.urlColumn}>
                <Typography sx={styles.secondaryHeading}>
                  {authenticationToken.value}
                </Typography>
              </Div>
            </>
          ) : (
            <Typography sx={styles.heading}>
              {authenticationToken.value}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails sx={styles.details}>
          <h4>Plugins</h4>
          <PackageList
            fieldName='plugins'
            onChange={handleChange}
            packages={plugins.map(transformPlugin)}
          />
          <h4>Themes</h4>
          <PackageList
            fieldName='themes'
            onChange={handleChange}
            packages={themes.map(transformTheme)}
          />
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <CopyToClipboard
            copyText={authenticationToken.value}
            buttonText='Copy Authentication Token'
            ButtonProps={{
              variant: 'text',
              size: 'small',
              startIcon: (
                <ContentCopyOutlinedIcon />
              )
            }}
          />
          <Button
            size='small'
            color='primary'
            startIcon={<SettingsIcon />}
            onClick={handleConfigureDialogOpen}
          >
            Configure
          </Button>
          <Button
            size='small'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={handleDeleteDialogOpen}
          >
            Delete
          </Button>
        </AccordionActions>
      </Accordion>
      <Dialog
        open={configureDialogOpen}
        onClose={handleConfigureDialogClose}
        aria-labelledby={`configure-${idPrefix}-dialog-title`}
      >
        <DialogTitle id={`configure-${idPrefix}-dialog-title`}>
          Configure Authentication Token
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputRef={labelEl}
            size='small'
            margin='normal'
            variant='outlined'
            id='label'
            label='Label'
            type='text'
            defaultValue={authenticationToken.label}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfigureDialogClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfigure} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogContent>
          Are you sure you want to permanently delete this authentication token?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

AuthenticationToken.propTypes = {
  authenticationToken: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    enabled: PropTypes.bool,
    selectedPlugins: PropTypes.arrayOf(PropTypes.string),
    selectedThemes: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default AuthenticationToken
