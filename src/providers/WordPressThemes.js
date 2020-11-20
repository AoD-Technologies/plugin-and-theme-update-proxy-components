import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

import NO_OP from '../utilities/noOp'

export const WordPressThemesContext = createContext(null)
export const WordPressThemesSetterContext = createContext(NO_OP)

const { Provider: ValueProvider } = WordPressThemesContext
const { Provider: SetterProvider } = WordPressThemesSetterContext

export const WordPressThemesProvider = ({ children }) => {
  const [value, setValue] = useState([])

  return (
    <SetterProvider value={setValue}>
      <ValueProvider value={value}>{children}</ValueProvider>
    </SetterProvider>
  )
}

WordPressThemesProvider.propTypes = {
  children: PropTypes.node
}
