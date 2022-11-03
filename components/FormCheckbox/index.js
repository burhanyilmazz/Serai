import { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FormCheckbox.module.scss';
export const FormCheckbox = (props) => { 

  const { label, name, disabled, onChange, onClickText, errorMessage, required, className,  ...rest } = props;

  const [isChecked, setIsChecked] = useState(rest.checked);
	const elementId = `cb-${name}`;

	const handleClickText = (event) => {
		if (onClickText) onClickText(event);
	};

	const onChangeFn = (e) => {
		setIsChecked(!isChecked);
		onChange && onChange(e, !isChecked)
	};

	useEffect(() => {
		setIsChecked(rest.checked);
	}, [rest?.checked])
  
  return (
    <>
			<label className={classNames(styles['checkbox'], className)} htmlFor={elementId}>
				<input
					id={elementId}
					type="checkbox"
					disabled={disabled}
					onChange={onChangeFn}
					required={required}
					{...rest}
					checked={isChecked}
				/>
        <span />
				<div
					onClick={handleClickText}
					dangerouslySetInnerHTML={{ __html: label }}
					aria-label={label}
				/>
			  {required && <pre>{errorMessage}</pre>}
			</label>
		</>
  )
}

FormCheckbox.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	onClickText: PropTypes.func,
	message: PropTypes.string,
	required: PropTypes.bool,
};

FormCheckbox.defaultProps = {
  name: '',
	label: '',
	message: '',
	disabled: false,
	checked: false,
	onClickText: undefined,
	required: false,
}