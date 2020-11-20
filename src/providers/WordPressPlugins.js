import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

import NO_OP from '../utilities/noOp'

export const WordPressPluginsContext = createContext(null)
export const WordPressPluginsSetterContext = createContext(NO_OP)

const { Provider: ValueProvider } = WordPressPluginsContext
const { Provider: SetterProvider } = WordPressPluginsSetterContext

export const WordPressPluginsProvider = ({ children }) => {
  const [value, setValue] = useState([])

  return (
    <SetterProvider value={setValue}>
      <ValueProvider value={value}>{children}</ValueProvider>
    </SetterProvider>
  )
}

WordPressPluginsProvider.propTypes = {
  children: PropTypes.node
}
