import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon } from '../'

import styles from './SelectedList.module.scss';

export const SelectedList = (props) => {
  const { data, className } = props;
  
  return (
    <div className={classNames(styles['selected-list'], className)}>
      {
        data.map((item, index) => {
          return (
            <div className={styles['box']} key={index}>
              <div className={styles['count']}>
                {data.length - 1 === index && <Icon icon='flag' /> } {data.length - 1 !== index && <span>0{index + 1}</span>}
              </div>
              <h6>{item.title}</h6>
              <p>{item.content}</p>
            </div>
          )
        })
      }
    </div>
  )
}

SelectedList.propTypes = {
	data: PropTypes.array
};