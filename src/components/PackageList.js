import { useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel
} from '@mui/material'

const INSTALL_LINK_STYLE = {
  display: 'flex',
  justifyContent: 'space-between'
}

const renderInstallLink = ({ slug, name, title, installLink }) => (
  <div key={slug} style={INSTALL_LINK_STYLE}>
    <span>{title || name}</span>
    <button className='button' onClick={installLink}>
      Install Now
    </button>
  </div>
)

const PackageList = ({ onChange, packages, type, fieldName }) => {
  const renderCheckbox = useCallback(
    ({ id, name, title, selected }) => (
      <FormControlLabel
        key={id}
        control={
          <Checkbox
            name={`${fieldName}[]`}
            checked={selected}
            onChange={onChange}
            value={id}
          />
        }
        label={title || name}
      />
    ),
    [onChange, fieldName]
  )

  switch (type) {
    case 'select':
      return (
        <FormControl variant="standard" component='fieldset'>
          <FormGroup>{packages.map(renderCheckbox)}</FormGroup>
        </FormControl>
      )
    case 'install':
      return (
        <FormControl variant="standard" component='fieldset'>
          <FormGroup>{packages.map(renderInstallLink)}</FormGroup>
        </FormControl>
      )
    default:
      return null
  }
}

PackageList.defaultProps = {
  type: 'select',
  fieldName: 'packages'
}

PackageList.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  onChange: PropTypes.func,
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      slug: PropTypes.string,
      selected: PropTypes.bool,
      installLink: PropTypes.func
    })
  )
}

export default PackageList
