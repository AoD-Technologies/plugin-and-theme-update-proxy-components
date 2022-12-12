import { useContext, useCallback } from 'react'

import {
  Alert,
  Snackbar as MUISnackbar
} from '@mui/material'

import {
  SnackBarMessageContext,
  SnackBarShowMessageContext,
  SnackBarOpenContext,
  SnackBarOpenSetterContext
} from '../providers/SnackBar'

const SnackBar = () => {
  const open = useContext(SnackBarOpenContext)
  const setOpen = useContext(SnackBarOpenSetterContext)

  const data = useContext(SnackBarMessageContext)

  const showSnackBarMessage = useContext(SnackBarShowMessageContext)

  const handleSnackBarClose = useCallback(
    (event, reason) => {
      if (reason === 'clickaway') {
        return
      }

      setOpen(false)
    },
    [setOpen]
  )

  const handleSnackBarExited = useCallback(() => {
    showSnackBarMessage()
  }, [showSnackBarMessage])

  return (
    <MUISnackbar
      key={data?.key}
      open={open}
      autoHideDuration={6000}
      onClose={handleSnackBarClose}
      onExited={handleSnackBarExited}
    >
      {data ? (
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleSnackBarClose}
          severity={data.severity}
        >
          {data.message}
        </Alert>
      ) : null}
    </MUISnackbar>
  )
}

export default SnackBar
