import Button from '../Button/Button.jsx';
import {useNavigate} from 'react-router-dom';
import styles from './BackBlock.module.css';

const BackBlock = ({to, button, buttonTitle, handler}) => {
  const navigate = useNavigate();
  const backHandler = () => navigate(to || -1);

  return (
    <div className={styles.back}>
      <Button onClick={backHandler} type={'button'}>« Назад</Button>
      {button && <Button onClick={handler}>{buttonTitle}</Button>}
    </div>
  );
};

export default BackBlock;