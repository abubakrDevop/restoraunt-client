import styles from './Footer.module.css';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.block}>
        <h1>Контакты</h1>
        <ul>
          <li>
            <a href={"tel:+79995451231"}>Позвоните нам</a>
          </li>
          <li>
            <Link to={'https://t.me/telegram'}>Напишите нам</Link>
          </li>
          <li>
            <Link to={'https://yandex.ru/maps/geo/moskva/53000094/?ll=37.385439%2C55.584227&z=10'}>Наш адресс</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;