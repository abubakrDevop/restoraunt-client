import styles from './Search.module.css';
import searchIcon from '../../assets/search/search-icon.svg';
import {useState} from 'react';

const Search = ({products, setProducts, category}) => {
  const [search, setSearch] = useState('');

  const searchHandler = (e) => {
    if (e.target.value === '') {
      setProducts(
        products.filter(product => product.categoryId === category.id));
    } else {
      setProducts(
        products?.filter(product => product.categoryId === category.id && product.name.includes(e.target.value)));
    }

    setSearch(e.target.value);
  };

  return <label className={styles.search}>
    <img src={searchIcon} alt="Search"/>
    <input onChange={searchHandler} value={search} type={'text'}
           placeholder={'Поиск'}/>
  </label>;
};

export default Search;