import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Icon } from '../';

import styles from './Detail.module.scss';

export const Detail = (props) => {
  const { isShow, onClickClose } = props;

  const handleOutsideClick = (event) => {
    const { target } = event;

    if (target.nodeName === "ASIDE") onClickClose && onClickClose()
  }

  return (
    <aside className={classNames(styles['detail'], {[styles['detail--open']] : isShow })} onClick={(event) => handleOutsideClick(event)}>
      <div className={styles['content']}>
        <h2>Main features</h2>
        <div className={styles['close']} onClick={() => onClickClose && onClickClose()}><Icon icon={'close'} /></div>
        <div className={styles['desc']}>
          <h3>Structure</h3>
          <p>Ev hafif çelik (LGS) galvanize taşıyıcı sistem ve taşıyıcı çelik zemin şase olarak üretilmektedir. Su yalıtımlı, nefes alan buhar kesici ve nem bariyeri kullanılmaktadır. Duvar, zemin ve çatıda kullanılan yüksek performans ısı yalıtımı sayesinde en zorlu iklim koşullarında kullanılabilir.</p>

          <h3>External Walls</h3>
          <p>Isıl işlem görmüş, suya ve neme dayanıklı yüksek performans thermowood fin çamı dış mekan kullanımına uygun estetik lineer cephe aydınlatmaları.</p>

          <h3>Internal Walls & Ceiling</h3>
          <p>İç duvar ve tavanda İskandinav tarzda doğal ahşap kaplama. Ham ahşap, beyaz veya antrasit boyalı opsiyonel olarak seçilebilir.</p>

          <h3>Floor</h3>
          <p>Suya, lekelenmeye ve çizilmeye karşı dayanıklı, UV direnci yüksek meşe laminant parke. Soluk gri, doğal ve antrasit renk seçenekleri opsiyonel olarak sunulmaktadır.Banyoda estetik ve çevre postu seramik zemin kaplaması. Hem yaşam alanı ve banyoda elektrikli kablolu sistem yerden ısıtma.</p>

          <h3>Windows</h3>
          <p>Isı ve güneş kontrollü yalıtımlı 3 katmanlı temperli camlar ve alüminyum kasa yalıtımlı doğramalar ile yüksek enerji verimliliği.</p>

          <h3>Structure</h3>
          <p>Ev hafif çelik (LGS) galvanize taşıyıcı sistem ve taşıyıcı çelik zemin şase olarak üretilmektedir. Su yalıtımlı, nefes alan buhar kesici ve nem bariyeri kullanılmaktadır. Duvar, zemin ve çatıda kullanılan yüksek performans ısı yalıtımı sayesinde en zorlu iklim koşullarında kullanılabilir.</p>

          <h3>External Walls</h3>
          <p>Isıl işlem görmüş, suya ve neme dayanıklı yüksek performans thermowood fin çamı dış mekan kullanımına uygun estetik lineer cephe aydınlatmaları.</p>

          <h3>Internal Walls & Ceiling</h3>
          <p>İç duvar ve tavanda İskandinav tarzda doğal ahşap kaplama. Ham ahşap, beyaz veya antrasit boyalı opsiyonel olarak seçilebilir.</p>

          <h3>Floor</h3>
          <p>Suya, lekelenmeye ve çizilmeye karşı dayanıklı, UV direnci yüksek meşe laminant parke. Soluk gri, doğal ve antrasit renk seçenekleri opsiyonel olarak sunulmaktadır.Banyoda estetik ve çevre postu seramik zemin kaplaması. Hem yaşam alanı ve banyoda elektrikli kablolu sistem yerden ısıtma.</p>

          <h3>Windows</h3>
          <p>Isı ve güneş kontrollü yalıtımlı 3 katmanlı temperli camlar ve alüminyum kasa yalıtımlı doğramalar ile yüksek enerji verimliliği.</p>

          <h3>Structure</h3>
          <p>Ev hafif çelik (LGS) galvanize taşıyıcı sistem ve taşıyıcı çelik zemin şase olarak üretilmektedir. Su yalıtımlı, nefes alan buhar kesici ve nem bariyeri kullanılmaktadır. Duvar, zemin ve çatıda kullanılan yüksek performans ısı yalıtımı sayesinde en zorlu iklim koşullarında kullanılabilir.</p>

          <h3>External Walls</h3>
          <p>Isıl işlem görmüş, suya ve neme dayanıklı yüksek performans thermowood fin çamı dış mekan kullanımına uygun estetik lineer cephe aydınlatmaları.</p>

          <h3>Internal Walls & Ceiling</h3>
          <p>İç duvar ve tavanda İskandinav tarzda doğal ahşap kaplama. Ham ahşap, beyaz veya antrasit boyalı opsiyonel olarak seçilebilir.</p>

          <h3>Floor</h3>
          <p>Suya, lekelenmeye ve çizilmeye karşı dayanıklı, UV direnci yüksek meşe laminant parke. Soluk gri, doğal ve antrasit renk seçenekleri opsiyonel olarak sunulmaktadır.Banyoda estetik ve çevre postu seramik zemin kaplaması. Hem yaşam alanı ve banyoda elektrikli kablolu sistem yerden ısıtma.</p>

          <h3>Windows</h3>
          <p>Isı ve güneş kontrollü yalıtımlı 3 katmanlı temperli camlar ve alüminyum kasa yalıtımlı doğramalar ile yüksek enerji verimliliği.</p>
        </div>
      </div>
    </aside>
  )
}

Detail.propTypes = {
	isShow: PropTypes.bool,
  onClickClose: PropTypes.func
};

Detail.defaultProps = {
	isShow: false,
}