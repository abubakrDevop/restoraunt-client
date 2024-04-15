import styles from './PanelLayout.module.css';
import {NavLink, Outlet} from 'react-router-dom';
import UserStore from '../../stores/user.store.js';
import {useEffect, useState} from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';

const baseRoutes = [
  {
    id: 1,
    path: 'dashboard',
    access: ['ADMIN', 'COOK', 'WAITER'],
    name: 'Главная',
  }, {
    id: 2,
    path: 'users',
    access: ['ADMIN'],
    name: 'Сотрудники',
  },
  {
    id: 3,
    path: 'categories',
    access: ['ADMIN'],
    name: 'Категории',
  },
  {
    id: 4,
    path: 'products',
    access: ['ADMIN', 'COOK'],
    name: 'Блюда',
  },
  {
    id: 5,
    path: 'tables',
    access: ['ADMIN'],
    name: 'Столы',
  },
  {
    id: 6,
    path: 'orders',
    access: ['ADMIN', 'COOK'],
    name: 'Заказы',
  },
  {
    id: 7,
    path: "payments",
    access: ["ADMIN"],
    name: "Платежные системы"
  }
  ];

const PanelLayout = () => {
  const [isBurgerActive, setBurgerActive] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [routes, setRoutes] = useState([]);

  const burgerHandler = () => setBurgerActive(!isBurgerActive);

  useEffect(() => {
    const routeHandler = () => {
      const filteredRoutes = baseRoutes.filter(
        route => route.access.includes(UserStore.user.role));
      setRoutes(filteredRoutes);
      setLoading(false);
    };
    routeHandler();
  }, []);

  return (<>
    {!isLoading && <div className={styles.block}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {routes.map(route => <li key={route.id}>
            <NavLink className={({isActive}) => isActive ?
              `${styles.item} ${styles.active}` :
              styles.item}
                     to={route.path}>{route.name}</NavLink>
          </li>)}
        </ul>
      </nav>
      <div className={styles.burger_header}>
        <button className={styles.burger} onClick={burgerHandler}>
          <GiHamburgerMenu/></button>
      </div>
      {isBurgerActive &&
        <div onClick={burgerHandler} className={styles.navigation_overlay}>
          <nav onClick={(e) => e.stopPropagation()}
               className={styles.navigation_mobile}>
            <ul className={styles.list}>
              {routes.map(route => <li key={route.id}>
                <NavLink onClick={burgerHandler}
                         className={({isActive}) => isActive ?
                           `${styles.item} ${styles.active}` :
                           styles.item}
                         to={route.path}>{route.name}</NavLink>
              </li>)}
            </ul>
          </nav>
        </div>}


      <main className={styles.main}>
        <Outlet/>
      </main>
    </div>}
  </>);
};

export default PanelLayout;