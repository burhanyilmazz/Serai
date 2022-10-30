import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import styles from './PhoneFormInput.module.scss';

export const PhoneFormInput = (props) => { 
  const { className, field, maxLength, type, name, onChange, autocomplete, required, autoFocus, errorMessage, ...rest } = props;
  const [ phone, setPhone ] = useState(rest.value);

  const handleOnChange = (data) => {
    setPhone(data)
    onChange && onChange(data)
  }

  return (
    <div className={classNames(styles['phone-input'], className)}>
      <PhoneInput
        containerClass={styles['phone-input-container']}
        buttonClass={styles['phone-input-button']}
        country={'tr'}
        id={name}
        required={required}
        {...rest}
        value={phone}
        onChange={phone => handleOnChange(phone)}
      />
      {field && <label htmlFor={name}>{field} {required && <span>*</span>}</label> }
      {required && <pre>{errorMessage}</pre>}
    </div>
  )
}

PhoneFormInput.propTypes = {
	className: PropTypes.string,
  field: PropTypes.string,
	name: PropTypes.string,
	maxLength: PropTypes.number,
	dataDirty: PropTypes.bool,
	type: PropTypes.string,
	autocomplete: PropTypes.string,
	required: PropTypes.bool,
	autoFocus: PropTypes.bool,
};