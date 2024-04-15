import {useEffect, useState} from 'react';
import add from '../../assets/product/add.svg';
import remove from '../../assets/product/remove.svg';
import styles from './ProductSelector.module.css'

const ProductSelector = ({cart, addHandler, deleteHandler, product}) => {
  const [filteredCart, setFilteredCart] = useState({});

  useEffect(() => {
    const productHandler = () => {
      setFilteredCart(cart?.find(v => v.id === product.id));
    };
    productHandler();
  }, [cart]);

  return (
    <>
      {filteredCart ? (<>
        <button onClick={() => deleteHandler(product)}>
          <img src={remove} alt={'Remove product'}/>
        </button>
        <span>{filteredCart?.count}</span>
        <button onClick={() => addHandler(product)}>
          <img src={add} alt={'Add product'}/>
        </button>
      </>) : (<>
        <button onClick={() => addHandler(product)}>
          <img src={add} alt={'Add product'}/>
        </button>
      </>)}
    </>
  );
};

export default ProductSelector;