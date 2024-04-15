import CreateBlock from '../../components/CreateBlock/CreateBlock.jsx';
import {useEffect, useState} from 'react';
import PaymentService from '../../services/payment.service.js';
import {Switch} from '@headlessui/react';
import styles from './Payments.module.css';

const Payments = () => {
  const [isLoading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const {data} = await PaymentService.findAll();
      setPayments(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPayments().finally(() => setLoading(false));
  }, []);

  const setEnabled = async (payment) => {
    try {
      const {data} = await PaymentService.update(payment.id,
        {isActive: !payment.isActive});

      setPayments(prev => prev.map(
        item => item.id === payment.id ? {...item, ...data} : item));
    } catch (e) {
      console.log(e);
    }
  };

  return (<div>
    <CreateBlock title={'Платёжные системы'} hideButton/>
    {!isLoading && <div className={styles.block}>
      {payments.map(
        payment => <div className={styles.switch_block} key={payment.id}>
          <span>{payment.name}</span>
          <Switch
            checked={payment.isActive}
            onChange={() => setEnabled(payment)}
            className={`${styles.switch} ${payment.isActive ?
              styles.active :
              ''}`}
          >
            <span
              aria-hidden="true"
              className={`${styles.switch_button} ${payment.isActive ?
                styles.active :
                ''}`}
            />
          </Switch>
        </div>)}
    </div>}
  </div>);
};

export default Payments;