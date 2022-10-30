import { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FormInput.module.scss';
export const FormInput = (props) => { 

  const { className, field, maxLength, dataDirty, type, autocomplete, required, autoFocus, errorMessage, ...rest } = props;
  const [ dirty, setDirty ] = useState(dataDirty);

  useEffect(() => {
    setDirty(rest.value ? true : false)
  }, [rest.value])
  
  return (
    <>
      <div className={classNames(styles['input'], className)}>
        <input 
          maxLength = {maxLength}
          data-dirty = {dirty}
          type = {type}
          autoComplete = {autocomplete}
          autoFocus={autoFocus}
          id={rest.name}
          required={required}
          {...rest}
        />
        {field && <label htmlFor={rest.name}>{field} {required && <span>*</span>}</label> }
        {required && <pre>{errorMessage}</pre>}
      </div>
    </>
  )
}

FormInput.propTypes = {
	field: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	maxLength: PropTypes.number,
	dataDirty: PropTypes.bool,
	type: PropTypes.string,
	autocomplete: PropTypes.string,
	required: PropTypes.bool,
	autoFocus: PropTypes.bool,
};

FormInput.defaultProps = {
  field: "",
  type: "text",
  dataDirty: false
}