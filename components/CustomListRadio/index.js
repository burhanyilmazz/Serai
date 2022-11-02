import { useState } from 'react';
import Image from 'next/image'
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './CustomListRadio.module.scss';
import { Tooltip } from '../Tooltip';

export const CustomListRadio = (props) => {
  const { data, onClick, className } = props;
  const [list, setList] = useState(data)

  const handleClick = (item, index) => {
    list[index].selected = true;
    list.map((li, i) => {
      if (i !== index) list[i].selected = false
    })
    
    setList([...list]);
    onClick && onClick(item)
  }

  return (
    <table className={classNames(styles['list'], className)}>
      <thead>
        <tr>
          <th>Color</th>
          <th>Walls</th>
          <th>Floors</th>
        </tr>
      </thead>
      <tbody>
      {
        list.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <div className={classNames(styles['button'], {[styles['button--disabled']]: item.soon_status})} onClick={() => handleClick(item, index)}>
                  {item.image && <div className={styles['image']}><Image src={item.image} width={48} height={48} alt={item.title} /></div>}
                  <div className={styles['content']}>
                    <h5>{item.title} {item.tooltip && <Tooltip 
                      className={styles['tooltip']}
                      title={item.tooltip.title}
                      desc={item.tooltip.description}
                    />}</h5>
                    {item.description && <h6>{item.description}</h6> }
                    {item.soon_status && <span>Çok Yakında</span>}
                  </div>
                </div>
              </td>
              <td><label htmlFor={item.walls?.id}><input type='radio' name='walls' id={item.walls?.id} value={item.walls?.price} /></label></td>
              <td><label htmlFor={item.floors?.id}><input type='radio' name='floors' id={item.floors?.id} value={item.floors?.price} /></label></td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}

CustomListRadio.propTypes = {
	data: PropTypes.array,
  onClick: PropTypes.func,
  className: PropTypes.string,
};