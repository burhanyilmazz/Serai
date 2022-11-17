import Image from 'next/image'
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './TeamCard.module.scss';

export const TeamCard = (props) => { 
  const { className, data, horizontal } = props;

  const width = horizontal ? 380 : 493;
  const height = horizontal ? 531 : 300;
  
  return (
    <figure className={classNames(styles['team-card'], {[styles['team-card--horizontal']]: horizontal}, className)}>
      <picture>
        {data.mobile_image && <source media="(max-width: 1024px)" srcSet={data.mobile_image} /> }
        <Image src={data.image} alt={data.title} width={width} height={height}  />
      </picture>
      <figcaption>
        <h3>{data.name}</h3>
        <h6>{data.title}</h6>
        <p>{data.content}</p>
      </figcaption>
    </figure>
  )
}

TeamCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  horizontal: PropTypes.bool
};