import {Link} from 'react-router-dom';
import {parseOrderStatus} from '../../utils/parse.js';
import styles from './OrderItem.module.css';

const OrderItem = ({to, id, status, table, products}) => {

  const price = products?.reduce((acc, product) => acc + (product.price * product.product_order.count), 0)
  return (
    <Link className={styles.order} to={to}>
      <div className={styles.title}>
        <h1>Заказ №{id}</h1>
        <div className={styles.description}>
          <i className={`${status === 'COMPLETE' ?
            styles.green :
            status === 'PROGRESS' ? styles.blue : ""}`}>{parseOrderStatus(
            status)}</i>
          <b className={styles.green}>{price} руб.</b>
          <i>Стол №{table}</i>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;