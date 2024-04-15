import {useEffect, useState} from 'react';
import UserService from '../services/user.service.js';
import {toast} from 'react-toastify';
import {clearInputs} from '../utils/clearInputs.js';
import {useModal} from './useModal.js';

export const useUsers = () => {
  const {
    isActive,
    setActive,
    isEditActive,
    setEditActive,
    openHandler,
    openEditHandler,
  } = useModal();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState({});

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const nameHandler = (e) => setName(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const roleHandler = (role) => setRole(role);

  const closeHandler = () => {
    setActive(false);
    setEditActive(false);
    clearInputs([setName, setPassword, setRole]);
  };

  const fetchUsers = async () => {
    try {
      const {data} = await UserService.findAll();
      setUsers(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const editHandler = async (id) => {
    try {
      const {data} = await UserService.findOne(id);
      setUser(data)
      setName(data.name);
      roleHandler(data);
      openEditHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const updateUserHandler = async () => {
    try {
      await UserService.update(user?.id, {name, role: role.role});
      await fetchUsers();
      toast.success('Сотрудник изменен');
      closeHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      await UserService.delete(id);
      await fetchUsers();
      toast.success('Сотрудник удален');
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const createUserHandler = async () => {
    try {
      await UserService.create({name, password, role: role.role});
      await fetchUsers();
      toast.success('Сотрудник добавлен');
      closeHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  useEffect(() => {
    fetchUsers().finally(() => setLoading(false),
    );
  }, []);

  return {
    name,
    nameHandler,
    password,
    passwordHandler,
    role,
    roleHandler,
    users,
    isLoading,
    editHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    isActive,
    isEditActive,
    openHandler,
    closeHandler,
  };
};