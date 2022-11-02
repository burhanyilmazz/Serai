import Select from 'react-select'
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FormSelect.module.scss';
export const FormSelect = (props) => { 
  const { className, field, value, required, options, placeholder, onChange, errorMessage, ...rest } = props;

  const handleChange = (value) => onChange && onChange(value) 

  return (
    <>
      <div className={classNames('m-select', styles['select'], className)}>
        <Select 
          placeholder={placeholder}
          classNamePrefix = 'm-select'
          options={options}
          value={value}
          onChange={(newValue) => handleChange(newValue)}
          required={required}
          {...rest}
        />
        {field && <label>{field} {required && <span>*</span>}</label> }
        {required && <pre>{errorMessage}</pre>}
      </div>
    </>
  )
}

FormSelect.propTypes = {
	className: PropTypes.string,
	field: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	errorMessage: PropTypes.string,
};