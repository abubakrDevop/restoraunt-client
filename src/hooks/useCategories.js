import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {clearInputs} from '../utils/clearInputs.js';
import {useModal} from './useModal.js';
import CategoryService from '../services/category.service.js';
import UserService from '../services/user.service.js';

export const useCategories = () => {
  const {
    isActive,
    isEditActive,
    setActive,
    setEditActive,
    openHandler,
    openEditHandler,
  } = useModal();
  const [title, setTitle] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

  const titleHandler = (e) => setTitle(e.target.value);
  const closeHandler = () => {
    setActive(false);
    setEditActive(false);
    clearInputs([setTitle]);
  };

  const editHandler = async (id) => {
    try {
      const {data} = await CategoryService.findOne(id);
      setCategory(data);
      setTitle(data.title);
      openEditHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const fetchCategories = async () => {
    try {
      const {data} = await CategoryService.findAll();
      setCategories(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const updateCategoryHandler = async () => {
    try {
      await CategoryService.update(category?.id, {title});
      await fetchCategories();
      toast.success('Категория изменена');
      closeHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const deleteCategoryHandler = async (id) => {
    try {
      await CategoryService.delete(id);
      await fetchCategories();
      toast.success('Категория удалена');
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const createCategoryHandler = async () => {
    try {
      await CategoryService.create({title});
      await fetchCategories();
      toast.success('Категория добавлена');
      closeHandler();
      clearInputs([setTitle]);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  useEffect(() => {
    fetchCategories().finally(() => setLoading(false),
    );
  }, []);

  return {
    title,
    titleHandler,
    categories,
    isLoading,
    createCategoryHandler,
    deleteCategoryHandler,
    updateCategoryHandler,
    editHandler,
    isActive,
    isEditActive,
    openHandler,
    closeHandler,
  };
};