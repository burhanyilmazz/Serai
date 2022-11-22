import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Image from 'next/image'

import styles from './Button.module.scss';

export const Button = (props) => { 
  const { className, text, locale, href, target, secondary, button, onClick, thirty, img, paypal } = props;

  const handleClick = () => onClick && onClick();
  
  return (
    <div className={classNames(styles['button'], className, {[styles['button--secondary']]: secondary, [styles['button--thirty']]: thirty, [styles['button--paypal']]: paypal})}>
      {locale && <Link href={href}>{text}</Link> }
      {!locale && !button && <a href={href} target={target} onClick={handleClick}>{text}</a> }
      {button && !locale && <button onClick={handleClick}>{img && <Image src={img} width={76} height={24} alt={'Paypal'} />}{text}</button> }
    </div>
  )
}

Button.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	img: PropTypes.string,
	paypal: PropTypes.bool,
	href: PropTypes.string,
	target: PropTypes.string,
	locale: PropTypes.bool,
  secondary: PropTypes.bool,
  thirty: PropTypes.bool,
  button: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  href: '#',
}