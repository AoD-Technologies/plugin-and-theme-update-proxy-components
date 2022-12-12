import { useState, useContext, useCallback, useEffect } from 'react'

import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider
} from '@mui/material'

import {
  Add as AddIcon,
  Sync as SyncIcon
} from '@mui/icons-material'

import AddSourceDialog from './AddSourceDialog'
import Source from './Source'

import { AddSourceDialogOpenSetterContext } from '../providers/AddSourceDialogOpen'
import { SnackBarShowMessageContext } from '../providers/SnackBar'
import { WordPressPluginsContext } from '../providers/WordPressPlugins'
import { WordPressThemesContext } from '../providers/WordPressThemes'

const SourcesPanel = () => {
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState(null)
  const [showBackdrop, setShowBackdrop] = useState(false)
  const [singleSourceDialogOpen, setSingleSourceDialogOpen] = useState(false)
  const [singleUpdatableDialogOpen, setSingleUpdatableDialogOpen] = useState(false)
  const [noInstallationDialogOpen, setNoInstallationDialogOpen] = useState(false)

  const setAddSourceDialogOpen = useContext(
    AddSourceDialogOpenSetterContext
  )
  const showSnackBarMessage = useContext(SnackBarShowMessageContext)
  const plugins = useContext(WordPressPluginsContext)
  const themes = useContext(WordPressThemesContext)

  const handleAddSourceDialogClose = useCallback(() => {
    setAddSourceDialogOpen(false)
  }, [setAddSourceDialogOpen])

  useEffect(() => {
    if (showSnackBarMessage) {
      global
        .fetch(`${global.PTUP.ajaxURL}?action=ptup_sources`)
        .then((res) => res.json())
        .then(setSource)
        .catch((e) => {
          showSnackBarMessage(
            `Failed to load source!${e.message ? ` Reason: ${e.message}` : ''}`,
            'error'
          )
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [showSnackBarMessage])

  const saveSource = useCallback(
    (newSource) => {
      if (showSnackBarMessage) {
        setShowBackdrop(true)

        global
          .fetch(`${global.PTUP.ajaxURL}?action=ptup_sources`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newSource)
          })
          .then((res) => {
            if (res.status !== 200) {
              throw new Error()
            }
            return res.json()
          })
          .then((fullSource) => {
            setSource(fullSource)
            showSnackBarMessage('Source saved successfully!', 'success')
            handleAddSourceDialogClose()
          })
          .catch((e) => {
            showSnackBarMessage(
              `Failed to save source!${
                e.message ? ` Reason: ${e.message}` : ''
              }`,
              'error'
            )
          })
          .finally(() => {
            setShowBackdrop(false)
          })
      }
    },
    [handleAddSourceDialogClose, showSnackBarMessage]
  )

  const handleAdd = useCallback(
    (newSource) => {
      if (source === null) {
        saveSource(newSource)
      } else {
        setSingleSourceDialogOpen(true)
      }
    },
    [saveSource, source]
  )

  const handleSingleSourceDialogClose = useCallback(() => {
    setSingleSourceDialogOpen(false)
  }, [])

  const handleSingleUpdatableDialogClose = useCallback(() => {
    setSingleUpdatableDialogOpen(false)
  }, [])

  const handleInstall = useCallback(() => {
    setNoInstallationDialogOpen(true)
  }, [])

  const handleNoInstallationDialogClose = useCallback(() => {
    setNoInstallationDialogOpen(false)
  }, [])

  const handleChange = useCallback(
    (event, update, newValues) => {
      const newSelectedPlugins = update.selectedPlugins
        ? Array.from(update.selectedPlugins).filter((selectedPlugin) =>
          plugins.some((plugin) => plugin.id === selectedPlugin)
        )
        : []
      const newSelectedThemes = update.selectedThemes
        ? Array.from(update.selectedThemes).filter((selectedTheme) =>
          themes.some((theme) => theme.id === selectedTheme)
        )
        : []
      if (event.target.name === 'plugins[]') {
        if (event.target.checked) {
          if (newSelectedPlugins.includes(event.target.value)) {
            return
          }

          if (newSelectedPlugins.length || newSelectedThemes.length) {
            setSingleUpdatableDialogOpen(true)
            return
          }

          newSelectedPlugins.push(event.target.value)
        } else {
          const selectedPluginIndex = newSelectedPlugins.indexOf(
            event.target.value
          )
          if (selectedPluginIndex === -1) {
            return
          }
          newSelectedPlugins.splice(selectedPluginIndex, 1)
        }

        const newSource = {
          ...source,
          selectedPlugins: newSelectedPlugins
        }
        saveSource(newSource)
      } else if (event.target.name === 'themes[]') {
        if (event.target.checked) {
          if (newSelectedThemes.includes(event.target.value)) {
            return
          }

          if (newSelectedPlugins.length || newSelectedThemes.length) {
            setSingleUpdatableDialogOpen(true)
            return
          }

          newSelectedThemes.push(event.target.value)
        } else {
          const selectedThemeIndex = newSelectedThemes.indexOf(
            event.target.value
          )
          if (selectedThemeIndex === -1) {
            return
          }
          newSelectedThemes.splice(selectedThemeIndex, 1)
        }

        const newSource = {
          ...source,
          selectedThemes: newSelectedThemes
        }
        saveSource(newSource)
      } else if (newValues) {
        const newSource = {
          ...source,
          ...newValues
        }
        saveSource(newSource)
      } else {
        const newSource = {
          ...source,
          enabled: !source.enabled
        }
        saveSource(newSource)
      }
    },
    [plugins, themes, source, saveSource]
  )

  const handleDelete = useCallback(() => {
    saveSource(null)
  }, [saveSource])

  return (
    <div>
      <p
        style={{
          marginTop: 0
        }}
      >
        The source WordPress site will be checked for updates for your plugins
        and themes.
      </p>
      <p>
        NOTE: You may toggle the source site on and off by clicking on its
        status icon (<SyncIcon style={{ verticalAlign: 'middle' }} />)
      </p>
      <Divider />
      <p>
        PRO TIP: Do you have multiple plugins and themes to update, or multiple source sites from which you would like to
        update? Or perhaps some plugins and themes you would like to install directly from those sites?
        <br />
        {
          // eslint-disable-next-line react/jsx-no-target-blank
        }<a href='https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&amp;utm_medium=software&amp;utm_term=pro-tip-link&amp;utm_content=settings&amp;utm_campaign=wordpress-ad' target='_blank' rel='noopener'>Upgrade to Plugin and Theme Update Proxy Premium</a>
        &nbsp;and enjoy unlimited updatable plugins and themes, unlimited source sites, as well as installation of new plugins and themes directly from source sites!
      </p>
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <CircularProgress size={48} />
          <p>Loading Source, please wait...</p>
        </div>
      ) : source === null ? (
        <p
          style={{
            textAlign: 'center'
          }}
        >
          You have not specified an update source. Try adding one using the (<AddIcon style={{ verticalAlign: 'middle' }} />) button in the bottom right corner of this screen!
        </p>
      ) : (
        <Source
          source={source}
          index={0}
          onChange={handleChange}
          onDelete={handleDelete}
          onInstall={handleInstall}
        />
      )}
      <AddSourceDialog onAdd={handleAdd} />
      <Dialog
        open={singleSourceDialogOpen}
        onClose={handleSingleSourceDialogClose}
      >
        <DialogContent>
          Sorry, the free version of Plugin and Theme Update Proxy is limited to a single source site.
          <br />
          {
            // eslint-disable-next-line react/jsx-no-target-blank
          }<a href='https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&amp;utm_medium=software&amp;utm_term=single-source-site-link&amp;utm_content=settings&amp;utm_campaign=wordpress-ad' target='_blank' rel='noopener'>Upgrade to Plugin and Theme Update Proxy Premium</a>
          &nbsp;and enjoy unlimited source sites!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSingleSourceDialogClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={singleUpdatableDialogOpen}
        onClose={handleSingleUpdatableDialogClose}
      >
        <DialogContent>
          Sorry, the free version of Plugin and Theme Update Proxy is limited to a single updatable plugin or theme.
          <br />
          {
            // eslint-disable-next-line react/jsx-no-target-blank
          }<a href='https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&amp;utm_medium=software&amp;utm_term=single-updatable-plugin-or-theme-link&amp;utm_content=settings&amp;utm_campaign=wordpress-ad' target='_blank' rel='noopener'>Upgrade to Plugin and Theme Update Proxy Premium</a>
          &nbsp;and enjoy unlimited updatable plugins and themes!
          <br />
          To select a different plugin or theme for updates with the free version, please deselect the currently selected plugin or theme first.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSingleUpdatableDialogClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={noInstallationDialogOpen} onClose={handleNoInstallationDialogClose}>
        <DialogContent>
          Sorry, the free version of Plugin and Theme Update Proxy does not support plugin or theme installation from source sites.
          <br />
          {
            // eslint-disable-next-line react/jsx-no-target-blank
          }<a href='https://aod-tech.com/products/plugin-and-theme-update-proxy-premium/?utm_source=plugin-and-theme-update-proxy&amp;utm_medium=software&amp;utm_term=plugin-and-theme-installation-link&amp;utm_content=settings&amp;utm_campaign=wordpress-ad' target='_blank' rel='noopener'>Upgrade to Plugin and Theme Update Proxy Premium</a>
          &nbsp;and enjoy installation of new plugins and themes directly from source sites!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoInstallationDialogClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        open={showBackdrop}
        sx={{
					color: 'common.white',
					zIndex: theme => theme.zIndex.modal + 1,
					flexDirection: 'column'
				}}
      >
        <CircularProgress color='inherit' size={64} />
        <p>Saving, please wait...</p>
      </Backdrop>
    </div>
  )
}

export default SourcesPanel
