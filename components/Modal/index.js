import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from "../"
import styles from './Modal.module.scss';

export const Modal = (props) => { 

  const { className, onClose } = props;
	
	const handleOutsideClick = (event) => {
    const { target } = event;

    if (target.nodeName === "ASIDE") onClose && onClose();
  }

	const handleOnClose = () =>  onClose && onClose();
  
  return (
    <aside className={classNames(styles['modal'], styles[className])} onClick={(event) => handleOutsideClick(event)}>
			<div className={styles['container']}>
      	<div className={styles['close']} onClick={handleOnClose}><Icon icon='close' /></div>
				<div className={styles['body']}>
					{ props.children }
				</div>
			</div>
		</aside>
  )
}

Modal.propTypes = {
	onClose: PropTypes.func,
};