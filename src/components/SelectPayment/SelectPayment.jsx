import {useEffect, useState} from 'react';
import PaymentService from '../../services/payment.service.js';
import styles from './SelectPayment.module.css';
import OrderService from '../../services/order.service.js';
import {useParams} from 'react-router-dom';

const SelectPayment = ({isActive, setActive, price, cart, setCart}) => {
  const {id} = useParams();
  const [isLoading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [isOrdered, setIsOrdered] = useState(false);

  const submitOrderHandler = async (type) => {
    try {
      const {data} = await OrderService.create({
        tableId: id,
        products: cart,
        price,
        type,
      });

      setCart([]);

      if (type === 'Наличные') {
        setIsOrdered(true);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onOpen = () => {
    setIsOrdered(false);
    setActive(!isActive);
  };

  const fetchPayments = async () => {
    try {
      const {data} = await PaymentService.findAll();
      setPayments(data.filter(v => v.isActive));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPayments().finally(() => setLoading(false));
  }, []);

  return (
    <>
      {(!isLoading && isActive) &&
        <div onClick={onOpen} className={styles.modal}>
          <div onClick={e => e.stopPropagation()}
               className={styles.modal_content}>
            <div className={styles.modal_container}>
              <span onClick={onOpen}>&#10006;</span>
              <div className={styles.modal_body}>
                {!isOrdered ?
                  <div className={styles.payments}>
                    {payments.length > 0 &&
                      payments.map(
                        payment => <button
                          onClick={() => submitOrderHandler(payment.name)}
                          className={styles.button}
                          key={payment.id}>{payment.name}</button>)
                    }</div> :
                  <div className={styles.title}>
                    <h1>Спасибо за заказ!</h1>
                    <p>В скором времени к Вам подойдет официант</p>
                  </div>}
              </div>
            </div>
          </div>
        </div>}
    </>
  );
};

export default SelectPayment;