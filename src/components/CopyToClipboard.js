import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import copyToClipboard from 'clipboard-copy'

import {
  Button,
  Tooltip
} from '@material-ui/core'

const CopyToClipboard = ({
  ButtonProps,
  TooltipProps,
  buttonText,
  copyText
}) => {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  const handleClick = useCallback(() => {
    copyToClipboard(copyText)
    setOpen(true)
  }, [copyText])

  return (
    <Tooltip
      title='Copied to Clipboard!'
      leaveDelay={1500}
      {...TooltipProps}
      open={open}
      onClose={handleClose}
    >
      <Button
        variant='contained'
        color='primary'
        {...ButtonProps}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </Tooltip>
  )
}

CopyToClipboard.defaultProps = {
  TooltipProps: {},
  ButtonProps: {},
  buttonText: 'Copy'
}

CopyToClipboard.propTypes = {
  ButtonProps: PropTypes.shape(Button.propTypes),
  TooltipProps: PropTypes.shape(Tooltip.propTypes),
  buttonText: PropTypes.string,
  copyText: PropTypes.string.isRequired
}

export default CopyToClipboard
