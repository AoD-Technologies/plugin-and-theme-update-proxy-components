import { useState, useContext, useCallback, useEffect } from 'react'

import {
  Backdrop,
  CircularProgress,
  Divider
} from '@mui/material'

import {
  Add as AddIcon,
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  Wifi as WifiIcon
} from '@mui/icons-material'

import AddAuthenticationTokenDialog from './AddAuthenticationTokenDialog'
import AuthenticationToken from './AuthenticationToken'
import CopyToClipboard from './CopyToClipboard'

import { AddAuthenticationTokenDialogOpenSetterContext } from '../providers/AddAuthenticationTokenDialogOpen'
import { SnackBarShowMessageContext } from '../providers/SnackBar'
import { WordPressPluginsContext } from '../providers/WordPressPlugins'
import { WordPressThemesContext } from '../providers/WordPressThemes'

const HostingPanel = () => {
  const [loading, setLoading] = useState(true)
  const [authenticationTokens, setAuthenticationTokens] = useState([])
  const [showBackdrop, setShowBackdrop] = useState(false)

  const setAddAuthenticationTokenDialogOpen = useContext(
    AddAuthenticationTokenDialogOpenSetterContext
  )
  const showSnackBarMessage = useContext(SnackBarShowMessageContext)
  const plugins = useContext(WordPressPluginsContext)
  const themes = useContext(WordPressThemesContext)

  const handleAddAuthenticationTokenDialogClose = useCallback(() => {
    setAddAuthenticationTokenDialogOpen(false)
  }, [setAddAuthenticationTokenDialogOpen])

  useEffect(() => {
    if (showSnackBarMessage) {
      global
        .fetch(`${global.PTUP.ajaxURL}?action=ptup_authentication_tokens`)
        .then((res) => res.json())
        .then((authenticationTokens) => {
          setAuthenticationTokens(authenticationTokens)
        })
        .catch((e) => {
          showSnackBarMessage(
            `Failed to load authentication tokens!${
              e.message ? ` Reason: ${e.message}` : ''
            }`,
            'error'
          )
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [showSnackBarMessage])

  const saveAuthenticationTokens = useCallback(
    (newAuthenticationTokens) => {
      if (showSnackBarMessage) {
        setAuthenticationTokens(newAuthenticationTokens)
        setShowBackdrop(true)

        global
          .fetch(`${global.PTUP.ajaxURL}?action=ptup_authentication_tokens`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newAuthenticationTokens)
          })
          .then((res) => {
            if (res.status !== 200) {
              throw new Error()
            }

            showSnackBarMessage(
              'Authentication tokens saved successfully!',
              'success'
            )
            handleAddAuthenticationTokenDialogClose()
          })
          .catch((e) => {
            showSnackBarMessage(
              `Failed to save authentication tokens!${
                e.message ? ` Reason: ${e.message}` : ''
              }`,
              'error'
            )
            if (process.env.NODE_ENV === 'production') {
              setAuthenticationTokens(authenticationTokens)
            } else {
              handleAddAuthenticationTokenDialogClose()
            }
          })
          .finally(() => {
            setShowBackdrop(false)
          })
      }
    },
    [
      handleAddAuthenticationTokenDialogClose,
      showSnackBarMessage,
      authenticationTokens
    ]
  )

  const handleAdd = useCallback(
    (newAuthenticationToken) => {
      const newAuthenticationTokens = Array.from(authenticationTokens)
      newAuthenticationTokens.splice(0, 0, newAuthenticationToken)
      saveAuthenticationTokens(newAuthenticationTokens)
    },
    [saveAuthenticationTokens, authenticationTokens]
  )

  const handleChange = useCallback(
    (event, authenticationToken, newValues) => {
      const index = authenticationTokens.indexOf(authenticationToken)
      if (index === -1) {
        return
      }

      if (event.target.name === 'plugins[]') {
        const newSelectedPlugins = authenticationToken.selectedPlugins
          ? Array.from(
            authenticationToken.selectedPlugins
          ).filter((selectedPlugin) =>
            plugins.some((plugin) => plugin.id === selectedPlugin)
          )
          : []
        if (event.target.checked) {
          if (newSelectedPlugins.includes(event.target.value)) {
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

        const newAuthenticationTokens = Array.from(authenticationTokens)
        newAuthenticationTokens[index] = {
          ...authenticationToken,
          selectedPlugins: newSelectedPlugins
        }
        saveAuthenticationTokens(newAuthenticationTokens)
      } else if (event.target.name === 'themes[]') {
        const newSelectedThemes = authenticationToken.selectedThemes
          ? Array.from(
            authenticationToken.selectedThemes
          ).filter((selectedTheme) =>
            themes.some((theme) => theme.id === selectedTheme)
          )
          : []
        if (event.target.checked) {
          if (newSelectedThemes.includes(event.target.value)) {
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

        const newAuthenticationTokens = Array.from(authenticationTokens)
        newAuthenticationTokens[index] = {
          ...authenticationToken,
          selectedThemes: newSelectedThemes
        }
        saveAuthenticationTokens(newAuthenticationTokens)
      } else if (newValues) {
        const newAuthenticationTokens = Array.from(authenticationTokens)
        newAuthenticationTokens[index] = {
          ...authenticationToken,
          ...newValues
        }
        saveAuthenticationTokens(newAuthenticationTokens)
      } else {
        const newAuthenticationTokens = Array.from(authenticationTokens)
        newAuthenticationTokens[index] = {
          ...authenticationToken,
          enabled: !authenticationToken.enabled
        }
        saveAuthenticationTokens(newAuthenticationTokens)
      }
    },
    [plugins, themes, authenticationTokens, saveAuthenticationTokens]
  )

  const handleDelete = useCallback(
    (authenticationToken) => {
      const index = authenticationTokens.indexOf(authenticationToken)
      if (index === -1) {
        return
      }

      const newAuthenticationTokens = Array.from(authenticationTokens)
      newAuthenticationTokens.splice(index, 1)
      saveAuthenticationTokens(newAuthenticationTokens)
    },
    [saveAuthenticationTokens, authenticationTokens]
  )

  return (
    <div>
      <p
        style={{
          marginTop: 0
        }}
      >
        Your Hosting URL:
        <br />
        <code>{global.PTUP.ajaxURL}?action=ptup_hosted</code>
      </p>
      <p>
        <CopyToClipboard
          copyText={`${global.PTUP.ajaxURL}?action=ptup_hosted`}
          buttonText='Copy Hosting URL'
          ButtonProps={{
            size: 'small',
            startIcon: (
              <ContentCopyOutlinedIcon />
            )
          }}
        />
      </p>
      <Divider />
      <p>
        Authentication tokens allow you to make certain plugins and themes
        available to other WordPress sites. It is best practice to use a
        separate token for each site, so that if one site is compromised you may
        delete or disable its token without affecting other sites.
      </p>
      <p>
        NOTE: You may toggle authentication tokens on and off by clicking on
        their status icon (<WifiIcon style={{ verticalAlign: 'middle' }} />)
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
          <p>Loading Authentication Tokens, please wait...</p>
        </div>
      ) : authenticationTokens.length === 0 ? (
        <p
          style={{
            textAlign: 'center'
          }}
        >
          You have not created any authentication tokens. Try adding one using the (<AddIcon style={{ verticalAlign: 'middle' }} />) button in the bottom right corner of this screen!
        </p>
      ) : (
        authenticationTokens.map((authenticationToken) => (
          <AuthenticationToken
            key={authenticationToken.value}
            authenticationToken={authenticationToken}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))
      )}
      <AddAuthenticationTokenDialog onAdd={handleAdd} />
      <Backdrop
        open={showBackdrop}
        sx={{
					color: 'common.white',
					zIndex: (theme) => theme.zIndex.modal + 1,
					flexDirection: 'column'
				}}
      >
        <CircularProgress color='inherit' size={64} />
        <p>Saving, please wait...</p>
      </Backdrop>
    </div>
  )
}

export default HostingPanel
