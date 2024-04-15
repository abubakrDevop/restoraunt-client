import styles from './AdminItems.module.css';

const AdminItems = ({children}) => {
  return (
    <div className={styles.items}>
      {children}
    </div>
  );
};

export default AdminItems;