import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

import NO_OP from '../utilities/noOp'

export const AddAuthenticationTokenDialogOpenContext = createContext(
  false
)
export const AddAuthenticationTokenDialogOpenSetterContext = createContext(
  NO_OP
)

const { Provider: ValueProvider } = AddAuthenticationTokenDialogOpenContext
const {
  Provider: SetterProvider
} = AddAuthenticationTokenDialogOpenSetterContext

export const AddAuthenticationTokenDialogOpenProvider = ({ children }) => {
  const [value, setValue] = useState(false)

  return (
    <SetterProvider value={setValue}>
      <ValueProvider value={value}>{children}</ValueProvider>
    </SetterProvider>
  )
}

AddAuthenticationTokenDialogOpenProvider.propTypes = {
  children: PropTypes.node
}
