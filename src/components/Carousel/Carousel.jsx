import styles from './Carousel.module.css';

import arrowLeft from '../../assets/carousel/arrow-left.svg';
import arrowRight from '../../assets/carousel/arrow-right.svg';
import {useRef, useState} from 'react';

const Carousel = ({items, selected, selectedHandler}) => {
  const ref = useRef(null);
  const handleButtonClick = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={styles.block}>
      <img onClick={() => handleButtonClick(-100)} src={arrowLeft} alt={'Arrow'}
           className={`${styles.arrow} ${styles.left}`}/>
      <img onClick={() => handleButtonClick(100)} src={arrowRight} alt={'Arrow'}
           className={`${styles.arrow} ${styles.right}`}/>
      <div ref={ref} className={styles.carousel}>
        {items.length > 0 && items.map(
          item => <span key={item.id} onClick={() => selectedHandler(item)}
                        className={item.id === selected.id ?
                          `${styles.item} ${styles.active}` :
                          styles.item}>{item.title}</span>)}
      </div>
    </div>
  );
};

export default Carousel;