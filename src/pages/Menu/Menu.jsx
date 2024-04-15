import PreviewBlock from '../../components/PreviewBlock/PreviewBlock.jsx';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TableService from '../../services/table.service.js';
import CategoryService from '../../services/category.service.js';
import ProductService from '../../services/product.service.js';
import Carousel from '../../components/Carousel/Carousel.jsx';
import Wrapper from '../../components/Wrapper/Wrapper.jsx';
import Products from '../../components/Products/Products.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './Menu.module.css';

const Menu = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [isAccess, setAccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [isWaiterCalled, setIsWaiterCalled] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});

  const codeHandler = (e) => setCode(e.target.value);

  const fetchTable = async () => {
    try {
      const {data} = await TableService.findOne(id);
      if (data.isBooked) {
        setAccess(false);
      } else {
        setAccess(true);
      }
    } catch (e) {
      console.log(e);
      navigate('/', {replace: true});
    }
  };

  const fetchCategories = async () => {
    try {
      const {data} = await CategoryService.findAll();
      setSelectedCategory(data[0]);
      setCategories(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProducts = async () => {
    try {
      const {data} = await ProductService.findAllActive();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const checkCode = async () => {
    try {
      await TableService.checkCode(id, {code});
      setAccess(true);
      setIsError(false);
      setError('');
    } catch (e) {
      console.log(e);
      setIsError(true);
      setError(e.response.data.message);
    }
  };

  const callWaiter = async () => {
    try {
      if (isWaiterCalled) {
        return;
      }
      await TableService.callWaiter(id);
      setIsWaiterCalled(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTable().then(() => {
      Promise.all([fetchCategories(), fetchProducts()]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <>
      {!isLoading && <main>
        <PreviewBlock button handler={() => callWaiter()}
                      waiterCalled={isWaiterCalled}/>
        <Wrapper>
          {isAccess ? <section className={styles.section}>
            <Carousel items={categories} selected={selectedCategory}
                      selectedHandler={setSelectedCategory}/>
            <Products products={products} selectedCategory={selectedCategory}/>
          </section> : <section className={styles.access_section}>
            <div className={styles.access_block}>
              <div className={styles.access}>
                <h1>Данный столик забронирован.</h1><p>Если это сделали Вы, то
                введите код доступа который вам отправили в Whatsapp</p>
                {isError && <span className={styles.error}>{error}</span>}
                <div className={styles.access_items}>
                  <input className={isError ? styles.error : ''}
                         onChange={codeHandler} value={code} type={'text'}
                         placeholder={'Код'}/>
                  <button onClick={() => checkCode()}>Проверить</button>
                </div>
              </div>
            </div>
          </section>}
        </Wrapper>
        <Footer/>
      </main>}
    </>
  );
};

export default Menu;