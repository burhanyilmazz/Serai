import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link'

import styles from './Button.module.scss';

export const Button = (props) => { 
  const { className, text, locale, href, target, secondary, button, onClick } = props;

  const handleClick = () => onClick && onClick();
  
  return (
    <div className={classNames(styles['button'], className, {[styles['button--secondary']]: secondary})}>
      {locale && <Link href={href}>{text}</Link> }
      {!locale && !button && <a href={href} target={target} onClick={handleClick}>{text}</a> }
      {button && !locale && <button onClick={handleClick}>{text}</button> }
    </div>
  )
}

Button.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	href: PropTypes.string,
	target: PropTypes.string,
	locale: PropTypes.bool,
  secondary: PropTypes.bool,
  button: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  href: '#'
}