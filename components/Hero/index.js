import Image from 'next/image'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ScrollIcon } from '../';

import styles from './Hero.module.scss';

export const Hero = (props) => { 
  const { img, title, text, bottom, mobile } = props;

  return (
    <section className={styles['hero']}>
      <div className={styles['image']}>
        <Image src={img} layout={'fill'} objectFit={'cover'} alt={title} />
      </div>
      <div className={classNames(styles['hero__container'], {[styles['hero__container--bottom']]: bottom})}>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <ScrollIcon className={styles['hero__scroll']} />
    </section>
  )
}

Hero.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  mobile: PropTypes.string,
  bottom: PropTypes.bool
};