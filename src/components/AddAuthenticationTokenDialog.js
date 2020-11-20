import { useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { v4 as uuidv4 } from 'uuid'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'

import {
  AddAuthenticationTokenDialogOpenContext,
  AddAuthenticationTokenDialogOpenSetterContext
} from '../providers/AddAuthenticationTokenDialogOpen'

const AddAuthenticationTokenDialog = ({ onAdd }) => {
  const open = useContext(AddAuthenticationTokenDialogOpenContext)
  const setOpen = useContext(
    AddAuthenticationTokenDialogOpenSetterContext
  )

  const labelEl = useRef(null)

  const handleAdd = useCallback(() => {
    onAdd({
      label: labelEl.current.value,
      value: uuidv4(),
      enabled: true,
      selectedPlugins: []
    })
  }, [onAdd])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='add-authentication-token-dialog-title'
    >
      <DialogTitle id='add-authentication-token-dialog-title'>
        Add Authentication Token
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
          fullWidth
        />
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

AddAuthenticationTokenDialog.propTypes = {
  onAdd: PropTypes.func.isRequired
}

export default AddAuthenticationTokenDialog
