import CreateBlock from '../../components/CreateBlock/CreateBlock.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import List from '../../components/List/List.jsx';
import {useUsers} from '../../hooks/useUsers.js';
import AdminItems from '../../components/AdminItems/AdminItems.jsx';
import AdminItem from '../../components/AdminItem/AdminItem.jsx';
import {roles} from '../../constants/constants.js';

const Users = () => {
  const {
    isLoading,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    editHandler,
    name,
    nameHandler,
    role,
    roleHandler,
    password,
    passwordHandler,
    users,
    isActive,
    isEditActive,
    openHandler,
    closeHandler,
  } = useUsers();

  return (<div>
    {isEditActive &&
      <Modal edit handler={updateUserHandler}
             setActive={closeHandler}
             title={'Изменить данные сотрудника'}>
        <input autoFocus onChange={nameHandler} value={name} type={'text'}
               placeholder={'Введите логин'}/>
        <List selected={role} handler={roleHandler}
              title={'Выберите роль...'} items={roles}/>
      </Modal>}
    {isActive &&
      <Modal handler={createUserHandler}
             setActive={closeHandler}
             title={'Добавить сотрудника'}>
        <input autoFocus onChange={nameHandler} value={name} type={'text'}
               placeholder={'Введите логин'}/>
        <input onChange={passwordHandler} value={password} type={'password'}
               placeholder={'Введите пароль'}/>
        <List selected={role} handler={roleHandler}
              title={'Выберите роль...'} items={roles}/>
      </Modal>}
    <CreateBlock title={'Сотрудники'} buttonName={'Добавить сотрудника'}
                 handler={openHandler}/>
    <div>
      {!isLoading && <AdminItems>
        {users.map(
          user => <AdminItem editHandler={editHandler}
                             deleteHandler={deleteUserHandler} title={user.name}
                             id={user.id}
                             key={user.id}/>)}
      </AdminItems>}
    </div>
  </div>);
};

export default Users;