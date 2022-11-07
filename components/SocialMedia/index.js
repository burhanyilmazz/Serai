import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from "../"
import styles from './SocialMedia.module.scss';

export const SocialMedia = (props) => { 
  const { className, title } = props;
  
  return (
    <div className={classNames(styles['social-media'], className)}>
      {title && <p>Follow Us</p> }
      <ul>
        <li><a href="#" target="_blank" aria-label='Serai Facebook' rel="noreferrer"><Icon icon="facebook" /></a></li>
        <li><a href="#" target="_blank" aria-label='Serai Twitter' rel="noreferrer"><Icon icon="twitter" /></a></li>
        <li><a href="#" target="_blank" aria-label='Serai Linkedin' rel="noreferrer"><Icon icon="google" /></a></li>
      </ul>
    </div>
  )
}

SocialMedia.propTypes = {
	className: PropTypes.string,
	title: PropTypes.bool,
};