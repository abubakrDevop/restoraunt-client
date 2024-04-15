import PreviewBlock from '../../components/PreviewBlock/PreviewBlock.jsx';
import Wrapper from '../../components/Wrapper/Wrapper.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import {useState} from 'react';

import styles from './Main.module.css';
import TableService from '../../services/table.service.js';

const Main = () => {
  const [isSend, setSend] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [mail, setMail] = useState('');

  const nameHandler = (e) => setName(e.target.value);
  const numberHandler = (e) => setNumber(e.target.value);
  const mailHandler = (e) => setMail(e.target.value);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await TableService.bookTable({name, number, mail});
      console.log(123);
      setSend(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (<main>
    <PreviewBlock button={false}/>
    <Wrapper>
      <section className={styles.section}>
        <div className={styles.block}>
          <div className={styles.content}>
            {!isSend ?
              <>
                <h1>Забронируйте столик в<br/>нашем ресторане с
                  меню</h1>
                <p>Оставьте свои контактные данные и наш менеджер
                  свяжется<br/>с
                  вами для подтверждения бронирования.</p>
                <form className={styles.form}>
                  <input onChange={nameHandler} value={name}
                         placeholder={'Имя'}/>
                  <input onChange={numberHandler} value={number}
                         placeholder={'Номер'}/>
                  <input onChange={mailHandler} value={mail}
                         placeholder={'Почта'}/>
                  <button type={'submit'} onClick={submitHandler}>Оставить
                    заявку
                  </button>
                </form>
                <span>Оставляя заявку, вы соглашаетесь на обработку персональных данных и<br/>с условиями бронирования счёта</span>
              </> : <>
                <h1>Заявка отправлена!</h1>
                <p>Ожидайте звонка от нашего менеджера.</p>
              </>}
          </div>
        </div>
      </section>
    </Wrapper>
    <Footer/>
  </main>);
};

export default Main;