import CreateBlock from '../../components/CreateBlock/CreateBlock.jsx';
import {useOrders} from '../../hooks/useOrders.js';
import OrderItem from '../../components/OrderItem/OrderItem.jsx';
import styles from './Orders.module.css';

const Orders = () => {
  const {isLoading, orders} = useOrders();
  return (
    <div>
      <CreateBlock hideButton={true} title={'Заказы'}/>
      {!isLoading && <div>
        {
          <div className={styles.orders}>
            {orders.map(
              order => <OrderItem key={order.id} to={`${order.id}`}
                                  id={order.id}
                                  status={order.status}
                                  table={order.table.number}
                                  products={order.products}/>)}
          </div>
        }
      </div>}
    </div>
  );
};

export default Orders;