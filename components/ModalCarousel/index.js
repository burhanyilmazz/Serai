/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Navigation, A11y, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import styles from './ModalCarousel.module.scss';
import classNames from 'classnames';

export const ModalCarousel = (props) => {
  const { data, className } = props;
  
  return (
    <div className={styles['modal__carousel']}>
      <Swiper
        modules={[Navigation, Pagination, A11y, EffectFade]}
        slidesPerView={1}
        spaceBetween={82}
        navigation
        effect='fade'
        autoHeight
        className={classNames('modal-carousel__slider', className)}
      >
        {
          data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Image src={item.image} width={1121} height={590} layout={'responsive'} objectFit={'cover'} alt={'slide'} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

ModalCarousel.propTypes = {
	data: PropTypes.array,
  className: PropTypes.string,
};