import styles from './Cart.module.css';
import cartIcon from '../../assets/cart/cart-icon.svg';
import {useEffect, useState} from 'react';
import CartItem from '../CartItem/CartItem.jsx';
import {useParams} from 'react-router-dom';
import OrderService from '../../services/order.service.js';
import SelectPayment from '../SelectPayment/SelectPayment.jsx';

const Cart = ({cart, setCart, addHandler, deleteHandler}) => {
  const [isActive, setActive] = useState(false);
  const [isPaymentActive, setPaymentActive] = useState(false);
  const [sortedCart, setSortedCart] = useState([]);
  const [price, setPrice] = useState(0);
  const openCart = () => setActive(!isActive);

  const openPaymentMenu = () => {
    setActive(false);
    setPaymentActive(true);
  };

  useEffect(() => {
    const sortCartHandler = () => {
      setSortedCart(cart.sort((a, b) => b.id - a.id));
      setPrice(cart.reduce(
        (acc, product) => acc + (product.price * product.count),
        0));
    };

    sortCartHandler();
  }, [cart]);

  return (<>
      {isActive && <div className={styles.modal} onClick={openCart}>
        <div onClick={e => e.stopPropagation()}
             className={styles.modal_content}>
          <div className={styles.title}>
            <img src={cartIcon} alt="Cart"/>
            <h1>Корзина</h1>
            <span onClick={openCart}>&#10006;</span>
          </div>
          <div className={styles.body}>
            {sortedCart.length > 0 ?
              sortedCart.map(
                product => <CartItem key={product.id} cart={cart}
                                     addHandler={addHandler}
                                     deleteHandler={deleteHandler}
                                     product={product}/>) :
              <h1>Корзина пуста</h1>}
          </div>
          {(sortedCart.length > 0) &&
            <div className={styles.footer}>
              <button
                onClick={openPaymentMenu}>Оформить заказ {price} руб.
              </button>
            </div>}
        </div>
      </div>}
      <SelectPayment isActive={isPaymentActive} setActive={setPaymentActive}
                     price={price} cart={cart} setCart={setCart}/>
      <div onClick={openCart}
           className={`${styles.cart} ${sortedCart.length > 0 ?
             styles.active :
             ''}`}>
        <img src={cartIcon} alt="Cart"/>
      </div>
    </>
  );
};

export default Cart;