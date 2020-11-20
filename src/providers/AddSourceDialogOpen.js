import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

import NO_OP from '../utilities/noOp'

export const AddSourceDialogOpenContext = createContext(false)
export const AddSourceDialogOpenSetterContext = createContext(NO_OP)

const { Provider: ValueProvider } = AddSourceDialogOpenContext
const { Provider: SetterProvider } = AddSourceDialogOpenSetterContext

export const AddSourceDialogOpenProvider = ({ children }) => {
  const [value, setValue] = useState(false)

  return (
    <SetterProvider value={setValue}>
      <ValueProvider value={value}>{children}</ValueProvider>
    </SetterProvider>
  )
}

AddSourceDialogOpenProvider.propTypes = {
  children: PropTypes.node
}
