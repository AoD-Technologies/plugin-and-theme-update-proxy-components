import { useContext, useRef, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core'

import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
  Sync as SyncIcon,
  SyncDisabled as SyncDisabledIcon
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

import PackageList from './PackageList'

import { WordPressPluginsContext } from '../providers/WordPressPlugins'
import { WordPressThemesContext } from '../providers/WordPressThemes'

const handleStopPropagation = (event) => event.stopPropagation()

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  dragHandle: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: 12
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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
}))

const Source = ({ source, index, onChange, onDelete, onInstall }) => {
  const classes = useStyles()

  const plugins = useContext(WordPressPluginsContext)
  const themes = useContext(WordPressThemesContext)

  const labelEl = useRef(null)
  const updateURLEl = useRef(null)
  const authenticationTokenEl = useRef(null)
  const skipSSLCertificateChecksEl = useRef(null)

  const [configureDialogOpen, setConfigureDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const idPrefix = useMemo(
    () => `source-${encodeURIComponent(source.updateURL)}`,
    [source.updateURL]
  )

  const transformPlugin = useCallback(
    (plugin) => {
      return {
        ...plugin,
        selected: source.selectedPlugins?.includes(plugin.id)
      }
    },
    [source.selectedPlugins]
  )

  const transformInstallablePackage = useCallback(
    ([slug, data]) => {
      return {
        ...data,
        slug,
        installLink: onInstall
      }
    },
    [onInstall]
  )

  const filterUpdatablePlugins = useCallback(
    ({ id }) =>
      source.plugins !== undefined && source.plugins[id] !== undefined,
    [source.plugins]
  )

  const filterInstallablePlugins = useCallback(
    ([slug]) => !plugins.find(({ id }) => id === slug),
    [plugins]
  )

  const updatablePlugins = useMemo(
    () => plugins.filter(filterUpdatablePlugins).map(transformPlugin),
    [plugins, filterUpdatablePlugins, transformPlugin]
  )

  const installablePlugins = useMemo(
    () =>
      source.plugins
        ? Object.entries(source.plugins)
          .filter(filterInstallablePlugins)
          .map(transformInstallablePackage)
        : [],
    [source.plugins, filterInstallablePlugins, transformInstallablePackage]
  )

  const transformTheme = useCallback(
    (theme) => {
      return {
        ...theme,
        selected: source.selectedThemes?.includes(theme.id)
      }
    },
    [source.selectedThemes]
  )

  const filterUpdatableThemes = useCallback(
    ({ id }) => source.themes !== undefined && source.themes[id] !== undefined,
    [source.themes]
  )

  const filterInstallableThemes = useCallback(
    ([slug]) => !themes.find(({ id }) => id === slug),
    [themes]
  )

  const updatableThemes = useMemo(
    () => themes.filter(filterUpdatableThemes).map(transformTheme),
    [themes, filterUpdatableThemes, transformTheme]
  )

  const installableThemes = useMemo(
    () =>
      source.themes
        ? Object.entries(source.themes)
          .filter(filterInstallableThemes)
          .map(transformInstallablePackage)
        : [],
    [source.themes, filterInstallableThemes, transformInstallablePackage]
  )

  const handleChange = useCallback(
    (event) => {
      onChange(event, source)
    },
    [source, onChange]
  )

  const handleConfigure = useCallback(
    (event) => {
      setConfigureDialogOpen(false)
      onChange(event, source, {
        label: labelEl.current.value,
        updateURL: updateURLEl.current.value,
        authenticationToken: authenticationTokenEl.current.value,
        skipSSLCertificateChecks: skipSSLCertificateChecksEl.current.checked
      })
    },
    [source, onChange]
  )

  const handleDelete = useCallback(
    (event) => {
      setDeleteDialogOpen(false)
      onDelete(source)
    },
    [source, onDelete]
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
      handleChange(event, source)
      return false
    },
    [handleChange, source]
  )

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${idPrefix}-content`}
          id={`${idPrefix}-header`}
        >
          <div
            className={classes.dragHandle}
            onClick={handleStopPropagation}
            onFocus={handleStopPropagation}
          />
          <Tooltip title={source.enabled ? 'Enabled' : 'Disabled'}>
            <div
              className={classes.dragHandle}
              onClick={handleToggle}
              onFocus={handleStopPropagation}
            >
              {source.enabled ? <SyncIcon /> : <SyncDisabledIcon />}
            </div>
          </Tooltip>
          {source.label ? (
            <>
              <div className={classes.labelColumn}>
                <Typography className={classes.heading}>
                  {source.label}
                </Typography>
              </div>
              <div className={classes.urlColumn}>
                <Typography className={classes.secondaryHeading}>
                  {source.updateURL}
                </Typography>
              </div>
            </>
          ) : (
            <Typography className={classes.heading}>
              {source.updateURL}
            </Typography>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {!updatablePlugins.length && !installablePlugins.length ? (
            <h4>No Plugins Available</h4>
          ) : null}
          {updatablePlugins.length ? (
            <>
              <h4>Updatable Plugins</h4>
              <PackageList
                fieldName='plugins'
                onChange={handleChange}
                packages={updatablePlugins}
              />
            </>
          ) : null}
          {installablePlugins.length ? (
            <>
              <h4>Installable Plugins</h4>
              <PackageList
                type='install'
                onChange={handleChange}
                packages={installablePlugins}
              />
            </>
          ) : null}
          {!updatableThemes.length && !installableThemes.length ? (
            <h4>No Themes Available</h4>
          ) : null}
          {updatableThemes.length ? (
            <>
              <h4>Updatable Themes</h4>
              <PackageList
                fieldName='themes'
                onChange={handleChange}
                packages={updatableThemes}
              />
            </>
          ) : null}
          {installableThemes.length ? (
            <>
              <h4>Installable Themes</h4>
              <PackageList
                type='install'
                onChange={handleChange}
                packages={installableThemes}
              />
            </>
          ) : null}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
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
        </ExpansionPanelActions>
      </ExpansionPanel>
      <Dialog
        open={configureDialogOpen}
        onClose={handleConfigureDialogClose}
        aria-labelledby={`configure-${idPrefix}-dialog-title`}
      >
        <DialogTitle id={`configure-${idPrefix}-dialog-title`}>
          Configure Source
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
            defaultValue={source.label}
            fullWidth
          />
          <TextField
            inputRef={updateURLEl}
            size='small'
            margin='normal'
            variant='outlined'
            id='updateURL'
            label='URL'
            type='url'
            defaultValue={source.updateURL}
            required
            helperText='This is provided in the Hosting tab (on the source site)'
            fullWidth
          />
          <TextField
            inputRef={authenticationTokenEl}
            size='small'
            margin='normal'
            variant='outlined'
            id='authenticationToken'
            label='Authentication Token'
            type='password'
            defaultValue={source.authenticationToken}
            required
            fullWidth
          />
          <FormControl component='fieldset'>
            <FormGroup>
              <FormControlLabel
                value='skipSSLCertificateChecks'
                control={
                  <Switch
                    inputRef={skipSSLCertificateChecksEl}
                    defaultChecked={source.skipSSLCertificateChecks}
                  />
                }
                label='Skip SSL Certificate Checks'
              />
            </FormGroup>
            <FormHelperText>
              Use this if the source site has an insecure SSL certificate
              <br />
              NOTE: You should install a secure SSL certificate on the source
              site instead!
            </FormHelperText>
          </FormControl>
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
          Are you sure you want to permanently delete this source?
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

Source.propTypes = {
  source: PropTypes.shape({
    label: PropTypes.string,
    updateURL: PropTypes.string.isRequired,
    authenticationToken: PropTypes.string.isRequired,
    skipSSLCertificateChecks: PropTypes.bool,
    enabled: PropTypes.bool,
    plugins: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        slug: PropTypes.string,
        selected: PropTypes.bool
      })
    ),
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        slug: PropTypes.string,
        selected: PropTypes.bool
      })
    ),
    selectedPlugins: PropTypes.arrayOf(PropTypes.string),
    selectedThemes: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInstall: PropTypes.func.isRequired
}

export default Source
