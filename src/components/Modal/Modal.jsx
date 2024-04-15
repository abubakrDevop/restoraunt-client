import styles from './Modal.module.css';
import Button from '../Button/Button.jsx';
import {useEffect} from 'react';

const Modal = ({children, title, setActive, handler, edit}) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setActive();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modal_container}>
        <div className={styles.modal_content}
             onClick={e => e.stopPropagation()}>
          <div className={styles.main}>
            <div className={styles.header}>
              <h1>{title}</h1>
              <span onClick={setActive}>&#x2715;</span>
            </div>
            <div className={styles.body}>
              {children}
            </div>
          </div>
          <div className={styles.footer}>
            <Button onClick={handler}>{edit ? 'Изменить' : 'Создать'}</Button>
            <Button onClick={setActive}>Отмена</Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Modal;