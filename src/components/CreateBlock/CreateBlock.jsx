import styles from './CreateBlock.module.css';
import Button from '../Button/Button.jsx';
import UserStore from '../../stores/user.store.js';

const CreateBlock = ({title, buttonName, handler, hideButton}) => {
  return (
    <div className={styles.block}>
      <h1 className={styles.title}>{title}</h1>
      {(!hideButton && UserStore.user.role === 'ADMIN') &&
        <Button type={'button'} onClick={handler}>{buttonName}</Button>}
    </div>
  );
};

export default CreateBlock;