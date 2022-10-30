import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './CustomTitle.module.scss';

export const CustomTitle = (props) => {
  const { title, desc, subtitle, onClick, page, className } = props;

  return (
    <div className={classNames(styles['custom'], className)}>
      {page && <h6>{page}</h6>}
      {title && <h2>{title}</h2> }
      {subtitle && <h3>{subtitle}</h3>}
      {desc && <p>{desc}</p>}
      {onClick && <span onClick={() => onClick && onClick()}>More Info</span>}
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
};