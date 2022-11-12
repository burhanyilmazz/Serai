import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon, Button } from '../'

import styles from './CustomTitle.module.scss';

export const CustomTitle = (props) => {
  const { title, desc, subtitle, onClick, page, className, icon, button, more } = props;

  return (
    <div className={classNames(styles['custom'], className)}>
      {icon && <div className={classNames(styles['icon'], {[styles['icon--error']]: icon === 'times'})}><Icon icon={icon} /></div> }
      {page && <h6>{page}</h6>}
      {title && <h2>{title}</h2> }
      {subtitle && <h3>{subtitle}</h3>}
      {desc && <p>{desc}</p>}
      {more && <span onClick={() => onClick && onClick()}>More Info</span>}
      {button && <Button text={'Try Again'} onClick={() => onClick && onClick()} />}
    </div>
  )
}

CustomTitle.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	subtitle: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  page: PropTypes.string,
  icon: PropTypes.string,
  button: PropTypes.bool,
  more: PropTypes.bool,
};