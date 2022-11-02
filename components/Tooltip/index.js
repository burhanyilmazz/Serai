import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Tooltip.module.scss';
import { Icon } from "../";

export const Tooltip = (props) => {
  const { className, title, desc } = props;
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div 
      className={classNames(styles['tooltip'], className)}
      data-tip={`<h2>${title}</h2><p>${desc}</p>`}
      data-html={true}
    >
      <Icon icon={'info'} />
      {isMounted && <ReactTooltip
        place="left"
        type="light"
        effect="solid"
        className={styles['tooltip-box']}
        multiline={true}
        data-html={true}
      /> }
    </div>
  )
}

Tooltip.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
};