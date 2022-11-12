import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Icon } from '../';

import styles from './Detail.module.scss';

export const Detail = (props) => {
  const { isShow, onClickClose, title, content } = props;

  const handleOutsideClick = (event) => {
    const { target } = event;

    if (target.nodeName === "ASIDE") onClickClose && onClickClose()
  }

  return (
    <aside className={classNames(styles['detail'], {[styles['detail--open']] : isShow })} onClick={(event) => handleOutsideClick(event)}>
      <div className={styles['content']}>
        <h2>{title}</h2>
        <div className={styles['close']} onClick={() => onClickClose && onClickClose()}><Icon icon={'close'} /></div>
        <div className={styles['desc']} dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </aside>
  )
}

Detail.propTypes = {
	isShow: PropTypes.bool,
  onClickClose: PropTypes.func
};

Detail.defaultProps = {
	isShow: false,
}