import {useState} from 'react';
import styles from './Login.module.css';
import UserService from '../../services/user.service.js';
import {useNavigate} from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import {toast} from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const {data} = await UserService.login(login, password);
      localStorage.setItem('token', data.accessToken);
      navigate('/dashboard', {preventScrollReset: true});
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data.message || "Ошибка");
    }
  };

  const loginHandler = (e) => setLogin(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <h1>Авторизация</h1>
          <form className={styles.from}>
            <input autoFocus className={styles.input} type={'text'}
                   placeholder={'Введите логин'} onChange={loginHandler}
                   value={login}/>
            <input
              className={styles.input} type={'password'}
              placeholder={'Введите пароль'} onChange={passwordHandler}
              value={password}/>
            <Button onClick={onSubmitHandler}
                    style={{marginTop: '10px'}}
                    type={'submit'}>Войти
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;