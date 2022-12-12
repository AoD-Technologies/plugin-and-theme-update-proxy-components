import { useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField
} from '@mui/material'

import {
  AddSourceDialogOpenContext,
  AddSourceDialogOpenSetterContext
} from '../providers/AddSourceDialogOpen'

const AddSourceDialog = ({ onAdd }) => {
  const open = useContext(AddSourceDialogOpenContext)
  const setOpen = useContext(AddSourceDialogOpenSetterContext)

  const labelEl = useRef(null)
  const updateURLEl = useRef(null)
  const authenticationTokenEl = useRef(null)
  const skipSSLCertificateChecksEl = useRef(null)

  const handleAdd = useCallback(() => {
    onAdd({
      label: labelEl.current.value,
      updateURL: updateURLEl.current.value,
      authenticationToken: authenticationTokenEl.current.value,
      skipSSLCertificateChecks: skipSSLCertificateChecksEl.current.checked,
      enabled: true,
      selectedPlugins: [],
      selectedThemes: []
    })
  }, [onAdd])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='add-source-dialog-title'
    >
      <DialogTitle id='add-source-dialog-title'>Add Source</DialogTitle>
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
          required
          fullWidth
        />
        <FormControl variant="standard" component='fieldset'>
          <FormGroup>
            <FormControlLabel
              value='skipSSLCertificateChecks'
              control={<Switch inputRef={skipSSLCertificateChecksEl} />}
              label='Skip SSL Certificate Checks'
            />
          </FormGroup>
          <FormHelperText>
            Use this if the source site has an insecure SSL certificate
            <br />
            NOTE: You should install a secure SSL certificate on the source site
            instead!
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleAdd} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddSourceDialog.propTypes = {
  onAdd: PropTypes.func.isRequired
}

export default AddSourceDialog
