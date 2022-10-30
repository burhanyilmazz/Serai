import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Icon } from '../';

import styles from './ScrollIcon.module.scss';

export const ScrollIcon = (props) => {
  const {className} = props;

  return (
    <div className={classNames(styles['scroll-icon'], className)}>
      <Icon icon='mouse' />
    </div>
  )
}

ScrollIcon.propTypes = {
	className: PropTypes.string
};