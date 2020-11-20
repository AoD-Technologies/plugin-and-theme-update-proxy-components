import { createContext, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import ReactDOM from 'react-dom'

import NO_OP from '../utilities/noOp'

export const SnackBarOpenContext = createContext(false)
export const SnackBarOpenSetterContext = createContext(NO_OP)
export const SnackBarMessageContext = createContext()
export const SnackBarShowMessageContext = createContext(NO_OP)

const { Provider: OpenProvider } = SnackBarOpenContext
const { Provider: OpenSetterProvider } = SnackBarOpenSetterContext
const { Provider: MessageProvider } = SnackBarMessageContext
const { Provider: ShowMessageProvider } = SnackBarShowMessageContext

export const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()

  const queue = useRef([])

  const setNextMessage = useCallback(() => {
    setMessage(queue.current.shift())
    setOpen(true)
  }, [])

  const processSnackBarQueue = useCallback(() => {
    setOpen(false)

    if (queue.current.length > 0) {
      ReactDOM.unstable_batchedUpdates(setNextMessage)
    }
  }, [setNextMessage])

  const showSnackBarMessage = useCallback(
    (message, severity) => {
      if (message) {
        queue.current.push({
          message,
          severity,
          key: Date.now()
        })
      }

      processSnackBarQueue()
    },
    [processSnackBarQueue]
  )

  return (
    <ShowMessageProvider value={showSnackBarMessage}>
      <OpenSetterProvider value={setOpen}>
        <OpenProvider value={open}>
          <MessageProvider value={message}>{children}</MessageProvider>
        </OpenProvider>
      </OpenSetterProvider>
    </ShowMessageProvider>
  )
}

SnackBarProvider.propTypes = {
  children: PropTypes.node
}
