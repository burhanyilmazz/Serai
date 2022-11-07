import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Hamburger.module.scss';

export const Hamburger = (props) => { 
  const { onClick, isOpen } = props;
  const [isChecked, setIsChecked] = useState(isOpen);

  const handleClick = () => {
    setIsChecked(!isChecked)
    onClick && onClick(!isChecked);
  }

  useEffect(() => {
    setIsChecked(isOpen)
  }, [isOpen])
  
  return (
    <div className={classNames(styles['hamburger'], {[styles['hamburger--open']] : isChecked } )} onClick={handleClick}>
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

Hamburger.propTypes = {
	onClick: PropTypes.func,
  isOpen: PropTypes.bool,
};

Hamburger.defaultProps = {
	isOpen: false,
}
