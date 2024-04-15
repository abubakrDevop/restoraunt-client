import {useModal} from './useModal.js';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {clearInputs} from '../utils/clearInputs.js';
import ProductService from '../services/product.service.js';
import CategoryService from '../services/category.service.js';
import {productStatus} from '../constants/constants.js';

export const useProducts = () => {
  const {
    isActive,
    isEditActive,
    setActive,
    setEditActive,
    openHandler,
    openEditHandler,
  } = useModal();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState({});

  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const nameHandler = (e) => setName(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);
  const priceHandler = (e) => setPrice(e.target.value);
  const statusHandler = (status) => setStatus(status);
  const categoryHandler = (category) => setCategory(category);

  const closeHandler = () => {
    setActive(false);
    setEditActive(false);
    clearInputs([setName, setDescription, setPrice]);
    setCategory({});
    setPhoto(null);
  };

  const photoHandler = (e) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
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

  const fetchProducts = async () => {
    try {
      const {data} = await ProductService.findAll();
      setProducts(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const editHandler = async (id) => {
    try {
      const {data} = await ProductService.findOne(id);
      const {data: categoryData} = await CategoryService.findOne(
        data?.categoryId);
      setProduct(data);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setStatus(!data.isActive ? productStatus[1] : productStatus[0]);
      setPhoto({name: data.image});
      setCategory(categoryData);
      openEditHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const updateProductHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('categoryId', category.id);
      formData.append('isActive',
        JSON.stringify(status.title === productStatus[0].title));
      if (photo) {
        formData.append('img', photo);
      }

      await ProductService.update(product?.id, formData);
      await fetchProducts();
      toast.success('Продукт изменен');
      closeHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      await ProductService.delete(id);
      await fetchProducts();
      toast.success('Продукт удален');
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const createProductHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('categoryId', category.id);
      formData.append('img', photo);

      await ProductService.create(formData);
      await fetchProducts();
      toast.success('Продукт добавлен');
      closeHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).
      finally(() => setLoading(false));
  }, []);

  return {
    name,
    nameHandler,
    description,
    descriptionHandler,
    status,
    statusHandler,
    price,
    priceHandler,
    category,
    categoryHandler,
    products,
    categories,
    isLoading,
    createProductHandler,
    deleteProductHandler,
    updateProductHandler,
    isActive,
    isEditActive,
    openHandler,
    editHandler,
    closeHandler,
    photo,
    photoHandler,
  };
};