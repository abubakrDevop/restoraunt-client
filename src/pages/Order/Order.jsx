import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import BackBlock from '../../components/BackBlock/BackBlock.jsx';
import {toast} from 'react-toastify';
import OrderService from '../../services/order.service.js';
import styles from './Order.module.css';
import {parseOrderStatus} from '../../utils/parse.js';

const Order = () => {
  const {id} = useParams();
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  const fetchOrder = async (id) => {
    try {
      const {data} = await OrderService.findOne(id);
      setOrder(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const changeOrderStatus = async () => {
    try {
      const status = order.status === 'CREATED' ?
        'PROGRESS' :
        order.status === 'PROGRESS' ? 'COMPLETE' : 'COMPLETE';
      const {data} = await OrderService.changeStatus(id, {status});
      setOrder(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  useEffect(() => {
    fetchOrder(id).finally(() => setLoading(false));
  }, []);

  const price = order?.products?.reduce(
    (acc, product) => acc + (product.price * product.product_order.count), 0);

  return (
    <>
      {!isLoading && <div>
        <BackBlock button={order.status !== 'COMPLETE' && order.status !== "PAYMENT"}
                   buttonTitle={`${order.status ===
                   'CREATED' ?
                     'В процессе' :
                     order?.status === 'PROGRESS' ? 'Завершен' : ''}`}
                   handler={changeOrderStatus}/>
        <div className={styles.order}>
          <div className={styles.title}>
            <h1>Заказ №{order?.id}</h1>
          </div>
          <div className={styles.order_item}>
            <p>Стоимось заказа:</p>
            <div className={styles.items}>
            <span
              className={`${styles.item} ${styles.green}`}>{price} руб.</span>
            </div>
          </div>
          <div className={styles.order_item}>
            <p>Статус:</p>
            <div className={styles.items}>
            <span className={`${styles.item} ${order?.status === 'COMPLETE' ?
              styles.green :
              order?.status === 'PROGRESS' ?
                styles.blue :
                ''}`}>{parseOrderStatus(
              order?.status)}</span>
            </div>
          </div>
          <div className={styles.order_item}>
            <p>Стол:</p>
            <div className={styles.items}>
              <span className={styles.item}>№{order?.table.number}</span>
            </div>
          </div>
          <div className={styles.order_item}>
            <p>Состав заказа:</p>
            <div className={styles.items}>
              {order?.products.map(product =>
                <span key={product.id}
                      className={styles.item}>{`${product.product_order.count} ${product.name}`}</span>)}
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Order;