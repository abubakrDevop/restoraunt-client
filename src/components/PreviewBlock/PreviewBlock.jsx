import styles from './PreviewBlock.module.css';

const PreviewBlock = ({button, handler, waiterCalled}) => {
  return (
    <section>
      <div className={styles.preview}>
        <h1>Насладитесь вкусами<br/>нашего ресторана</h1>
        <p>Попробуйте наши изысканные блюда, приготовленные с<br/>любовью и
          профессионализмом</p>
        {button && <button className={waiterCalled ?
          `${styles.button} ${styles.green}` :
          styles.button} onClick={handler}>{waiterCalled ?
          'Ваш официант скоро подойдет' :
          'Вызвать официанта'}</button>}
      </div>
    </section>
  );
};

export default PreviewBlock;