import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Loader} from '@googlemaps/js-api-loader';

import { mapOptions } from '../../utils/Map';

import styles from './Address.module.scss';

export const Address = (props) => { 
  const { data, className } = props;
  const [list, setList] = useState(data)

  const onClick = (item, index) => {
    list[index].isSelected = !list[index]?.isSelected;
    list.map((li, i) => {
      if (i !== index) list[i].isSelected = false
    })
    
    setList([...list]);
  }

  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyALsmBLvMeKOlK2M5SHs2_jgYeJM-6UdBU",
      sensor: false,
      language: 'tr'
    });
    let map;

    const listSelected = list.find((item) => item.isSelected);
    const googleList = listSelected ? [listSelected] : list;

    loader.load().then(() => {
      const google = window.google;
      const bounds = new google.maps.LatLngBounds();
      const icon = "/images/teams/pin.png";

      map = new google.maps.Map(googlemap.current, mapOptions);

      googleList.map((item, index) => {
        const marker = new google.maps.Marker({
          position: {lat: item.coordinate.lat, lng: item.coordinate.lng},
          map,
          icon
        });

        bounds.extend(marker.position);
      })

      if (listSelected) {
        map.setCenter(bounds.getCenter());
        map.setZoom(10);
      } else {
        map.fitBounds(bounds);
      }
    });
  });

  return (
    <div className={classNames(styles['address'], className)}>
      <div className={styles['address__list']}>
        {
          list.map((item, index) => {
            return (
              <div className={classNames(styles['item'], {[styles['item--active']]: item.isSelected})} key={index} onClick={() => onClick(item, index)}>
                <h6>{item.title}</h6>
                <p>
                  {item.address}<br />
                  {item.phone}<br />
                  {item.email && <b>{item.email}</b>}
                </p>
              </div>
            )
          })
        } 
      </div>
      <div id="map" ref={googlemap} />
    </div>
  )
}

Address.propTypes = {
  data: PropTypes.array
};