import styles from './Products.module.css';
import Search from '../Search/Search.jsx';
import Cart from '../Cart/Cart.jsx';
import {SERVER_URL} from '../../lib/axios.js';

import ProductSelector from '../ProductSelector/ProductSelector.jsx';
import {useEffect, useState} from 'react';

const Products = ({products, selectedCategory}) => {
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const addProductHandler = (product) => setCart(prev => {
    const cartItem = cart.find(v => v.id === product.id);
    if (!cartItem) {
      return [...prev, {...product, count: 1}];
    } else {
      return [
        ...prev.filter(item => item.id !== product.id),
        {...cartItem, count: cartItem.count + 1}];
    }
  });

  const deleteProductHandler = (product) => setCart(prev => {
    const cartItem = cart.find(v => v.id === product.id);
    if (cartItem && cartItem.count > 1) {
      return [
        ...prev.filter(item => item.id !== product.id),
        {...cartItem, count: cartItem.count - 1}];
    } else {
      return [...prev.filter(item => item.id !== product.id)];
    }
  });

  useEffect(() => {
    setFilteredProducts(products?.length > 0 && products.filter(
      product => product.categoryId === selectedCategory.id));
  }, [products, selectedCategory]);

  return (
    <div>
      <div className={styles.header}>
        <Search products={products} setProducts={setFilteredProducts} category={selectedCategory}/>
        <Cart cart={cart} setCart={setCart} addHandler={addProductHandler}
              deleteHandler={deleteProductHandler}/>
      </div>
      <div className={styles.products}>
        {filteredProducts?.length > 0 && filteredProducts.map(
          product => <div key={product.id} className={styles.product}>
            <img src={SERVER_URL + `/assets/product/${product.image}`}
                 alt={product.name}/>
            <div className={styles.product_info}>
              <div className={styles.product_title}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
              </div>
              <div className={styles.product_footer}>
                <span>{product.price} руб.</span>
                <div className={styles.product_select}>
                  <ProductSelector addHandler={addProductHandler}
                                   deleteHandler={deleteProductHandler}
                                   cart={cart} setCart={setCart}
                                   product={product}/>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>
  );
};

export default Products;