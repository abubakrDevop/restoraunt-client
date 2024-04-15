import React from 'react';
import CreateBlock from '../../components/CreateBlock/CreateBlock.jsx';
import AdminItems from '../../components/AdminItems/AdminItems.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import {useCategories} from '../../hooks/useCategories.js';
import AdminItem from '../../components/AdminItem/AdminItem.jsx';
import {Outlet} from 'react-router-dom';

const Categories = () => {
  const {
    editHandler,
    createCategoryHandler,
    deleteCategoryHandler,
    updateCategoryHandler,
    title,
    titleHandler,
    isActive,
    isEditActive,
    isLoading,
    openHandler,
    closeHandler,
    categories,
  } = useCategories();

  return (
    <div>
      {isEditActive &&
        <Modal edit handler={updateCategoryHandler}
               setActive={closeHandler}
               title={'Изменить категорию'}>
          <input autoFocus onChange={titleHandler} value={title} type={'text'}
                 placeholder={'Введите название'}/>
        </Modal>}
      {isActive &&
        <Modal handler={createCategoryHandler}
               setActive={closeHandler}
               title={'Добавить категорию'}>
          <input autoFocus onChange={titleHandler} value={title} type={'text'}
                 placeholder={'Введите название'}/>
        </Modal>}
      <CreateBlock title={'Категории'} buttonName={'Добавить категорию'}
                   handler={openHandler}/>
      <div>
        {!isLoading && <AdminItems>
          {categories.map(
            category => <AdminItem id={category.id} editHandler={editHandler}
                                   deleteHandler={deleteCategoryHandler}
                                   title={category.title} to={`${category.id}`}
                                   key={category.id}/>)}
        </AdminItems>}
      </div>
    </div>
  );
};

export default Categories;