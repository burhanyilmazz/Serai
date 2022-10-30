import { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FormTextarea.module.scss';

export const FormTextarea = (props) => { 
  const { className, field, maxLength, dataDirty, autocomplete, required, autoFocus, rows, ...rest } = props;
  const [ dirty, setDirty ] = useState(dataDirty);

  useEffect(() => {
    setDirty(rest.value ? true : false)
  }, [rest.value])
  
  return (
    <div className={classNames(styles['textarea'], className)}>
      <textarea 
        rows = {rows}
        maxLength = {maxLength}
        data-dirty = {dirty}
        autoComplete = {autocomplete}
        autoFocus={autoFocus}
        {...rest}
      />
      {field && <label>{field} {required && <span>*</span>}</label> }
      {required && <pre>{errorMessage}</pre>}
    </div>
  )
}

FormTextarea.propTypes = {
	field: PropTypes.string,
	maxLength: PropTypes.number,
	dataDirty: PropTypes.bool,
	autocomplete: PropTypes.string,
	required: PropTypes.bool,
	autoFocus: PropTypes.bool,
	rows: PropTypes.number,
};

FormTextarea.defaultProps = {
  field: "",
  dataDirty: false
}