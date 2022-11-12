import { useState } from 'react';
import Image from 'next/image'
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './CustomListButton.module.scss';
import { Tooltip } from '../Tooltip';

export const CustomListButton = (props) => {
  const { data, onClick, className } = props;
  const [list, setList] = useState(data)

  const handleClick = (item, index) => {
    if (item.soon_status) return false;

    list[index].selected = true;
    list.map((li, i) => {
      if (i !== index) list[i].selected = false
    })
    
    setList([...list]);
    onClick && onClick(item)
  }

  return (
    <div className={classNames(styles['list'], className)}>
      {
        list.map((item, index) => {
          return (
            <div className={classNames(styles['button'], {[styles['button--active']]: item.selected, [styles['button--disabled']]: item.soon_status, [styles['button--alone']]: !item.image})} key={index} onClick={() => handleClick(item, index)}>
              {item.image && <div className={styles['image']}><Image src={item.image} width={60} height={60} alt={item.title} /></div>}
              <div className={styles['content']}>
                <h5>{item.title}</h5>
                {item.description && <h6>{item.description}</h6> }
                {item.soon_status && <span>Çok Yakında</span>}
                {item.tooltip && <Tooltip 
                  className={styles['tooltip']}
                  title={item.tooltip.title}
                  desc={item.tooltip.description}
                />}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

CustomListButton.propTypes = {
	data: PropTypes.array,
  onClick: PropTypes.func,
  className: PropTypes.string,
};