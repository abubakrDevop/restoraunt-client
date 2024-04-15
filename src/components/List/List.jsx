import {useState} from 'react';
import {IoMdArrowDropdown} from 'react-icons/io';
import styles from './List.module.css';

const List = ({title, items, selected, handler}) => {
  const [isActive, setActive] = useState(false);
  const toggleHandler = () => setActive(!isActive);
  const selectItemHandler = (item) => {
    handler(item);
    toggleHandler();
  };

  return (
    <div className={styles.block}>
      <div onClick={toggleHandler} className={styles.title}>
        {selected?.role || selected?.title || selected?.name || title}
        <IoMdArrowDropdown className={isActive ?
          `${styles.arrow} ${styles.active}` :
          styles.arrow}/>
      </div>
      {isActive && (<div className={styles.list}>
        {items.map(
          item => (
            <div onClick={() => selectItemHandler(item)}
                 className={styles.item}
                 key={item.id}>{item.role || item.title || item.name}</div>),
        )}
      </div>)}
    </div>
  );
};

export default List;