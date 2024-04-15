import React from 'react';
import styles from './CartItem.module.css';
import {SERVER_URL} from '../../lib/axios.js';
import ProductSelector from '../ProductSelector/ProductSelector.jsx';

const CartItem = ({product, addHandler, deleteHandler, cart}) => {
  return <div key={product.id} className={styles.item}>
    <img src={SERVER_URL + `/assets/product/${product.image}`}
         alt={product.name}/>
    <div className={styles.item_body}>
      <div className={styles.item_title}>
        <h1>{product.name}</h1>
      </div>
      <div className={styles.item_footer}>
        <span>{product.price * product.count} руб.</span>
        <div className={styles.item_select}>
          <ProductSelector product={product} cart={cart}
                           addHandler={addHandler}
                           deleteHandler={deleteHandler}/>
        </div>
      </div>
    </div>
  </div>
};

export default CartItem;