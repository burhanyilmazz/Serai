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
        <li><a href="https://www.instagram.com/serai.spaces/" target="_blank" aria-label='Serai Instagram' rel="noreferrer"><Icon icon="instagram" /></a></li>
        <li><a href="https://www.linkedin.com/company/seraispaces/" target="_blank" aria-label='Serai Linkedin' rel="noreferrer"><Icon icon="linkedin" /></a></li>
        <li><a href="https://www.twitter.com/seraispaces/" target="_blank" aria-label='Serai Linkedin' rel="noreferrer"><Icon icon="twitter" /></a></li>
      </ul>
    </div>
  )
}

SocialMedia.propTypes = {
	className: PropTypes.string,
	title: PropTypes.bool,
};