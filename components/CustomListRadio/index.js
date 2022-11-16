import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './CustomListRadio.module.scss';
import { Tooltip } from '../Tooltip';

export const CustomListRadio = (props) => {
  const { data, onChange, className } = props;
  const [list, setList] = useState(data);
 
  const handleChange = (item, product) => {
    item.is_selected = true;
    list.map(li => {
      const finder = li.color_details.find(f => f.is_selected && f.product_type === item.product_type && f !== item);
      if (finder) finder.is_selected = false;

      li.color_details.map(color => {
        if (item.product_type === color.product_type) {
          color['lastPrice'] = (item.price - (item.price - color.newPrice)) || item.price
          color['newPrice'] = (color.price - item.price)
        }
      })
    })

    const radioList = []
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    for (const radio of radios) {
      radioList.push(radio.dataset.id)
    }

    item['product_id'] = product.id;
    item['product_title'] = product.title;

    setList([...list]);
    onChange && onChange(item, radioList)
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
                <div className={classNames(styles['button'], {[styles['button--disabled']]: item.soon_status})}>
                  {item.mini_image && <div className={styles['image']}><Image src={item.mini_image} width={48} height={48} alt={item.title} /></div>}
                  <div className={styles['content']}>
                    <h5>{item.title}</h5>
                    {item?.tooltip && <Tooltip 
                      className={styles['tooltip']}
                      title={item.tooltip.title}
                      desc={item.tooltip.description}
                    />}
                    {item.soon_status && <span>Çok Yakında</span>}
                  </div>
                </div>
              </td>
              {
                item.color_details.map((color, i) => {
                  if (i == 0 && color.product_type !== 'walls_color') {
                    return (
                      <>
                        <td key={i}>&nbsp;</td>
                        <td key={i}>
                          <label>
                            <input type='radio' name={color.product_type} value={color.price || 0} defaultChecked={color.is_selected} data-id={`${item.id}-${color.id}`} onChange={() => handleChange(color, item)}/>
                          </label>
                        </td>
                      </>
                    )
                  }

                  if (i == 1 && color.product_type !== 'floors_color') {
                    return (
                      <>
                        <td key={i}>
                          <label>
                            <input type='radio' name={color.product_type} value={color.price || 0} defaultChecked={color.is_selected} data-id={`${item.id}-${color.id}`} onChange={() => handleChange(color, item)} />
                          </label>
                        </td>
                        <td key={i}>&nbsp;</td>
                      </>
                    )
                  }

                  return (
                    <td key={i}>
                      <label>
                        <input type='radio' name={color.product_type} value={color.price || 0} defaultChecked={color.is_selected} data-id={`${item.id}-${color.id}`} onChange={() => handleChange(color, item)} />
                      </label>
                    </td>
                  )
                })
              }
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
  onChange: PropTypes.func,
  className: PropTypes.string,
};