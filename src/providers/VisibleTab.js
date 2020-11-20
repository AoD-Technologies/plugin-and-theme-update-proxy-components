import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

import NO_OP from '../utilities/noOp'

export const VisibleTabContext = createContext(0)
export const VisibleTabSetterContext = createContext(NO_OP)

const { Provider: ValueProvider } = VisibleTabContext
const { Provider: SetterProvider } = VisibleTabSetterContext

export const VisibleTabProvider = ({ children }) => {
  const [value, setValue] = useState(0)

  return (
    <SetterProvider value={setValue}>
      <ValueProvider value={value}>{children}</ValueProvider>
    </SetterProvider>
  )
}

VisibleTabProvider.propTypes = {
  children: PropTypes.node
}
