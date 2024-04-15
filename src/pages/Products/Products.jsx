import Modal from '../../components/Modal/Modal.jsx';
import CreateBlock from '../../components/CreateBlock/CreateBlock.jsx';
import AdminItems from '../../components/AdminItems/AdminItems.jsx';
import AdminItem from '../../components/AdminItem/AdminItem.jsx';
import {useProducts} from '../../hooks/useProducts.js';
import List from '../../components/List/List.jsx';
import UploadInput from '../../components/UploadInput/UploadInput.jsx';
import {productStatus} from '../../constants/constants.js';
import UserStore from '../../stores/user.store.js';

const Products = () => {
  const {
    isActive,
    isEditActive,
    isLoading,
    createProductHandler,
    deleteProductHandler,
    updateProductHandler,
    editHandler,
    openHandler,
    closeHandler,
    products,
    categories,
    name,
    nameHandler,
    status,
    statusHandler,
    description,
    descriptionHandler,
    price,
    priceHandler,
    category,
    categoryHandler,
    photo,
    photoHandler,
  } = useProducts();

  return (
    <div>
      {isEditActive &&
        <Modal edit handler={updateProductHandler}
               setActive={closeHandler}
               title={'Изменить продукт'}>
          {UserStore.user.role === 'ADMIN' ? <>
            <List items={categories} title={'Выберите категорию...'}
                  handler={categoryHandler} selected={category}/>
            <input autoFocus onChange={nameHandler} value={name} type={'text'}
                   placeholder={'Введите название продукта'}/>
            <input onChange={descriptionHandler} value={description}
                   type={'text'}
                   placeholder={'Введите описание'}/>
            <input onChange={priceHandler} value={price} type={'text'}
                   placeholder={'Введите цену продукта'}/>
            <List title={'Выберите статус...'} items={productStatus}
                  selected={status}
                  handler={statusHandler}/>
            <UploadInput setPhoto={photoHandler} photo={photo}/>
          </> : <>
            <List title={'Выберите статус...'} items={productStatus}
                  selected={status}
                  handler={statusHandler}/>
          </>}
        </Modal>}
      {isActive &&
        <Modal handler={createProductHandler}
               setActive={closeHandler}
               title={'Добавить новый продукт'}>
          <List items={categories} title={'Выберите категорию...'}
                handler={categoryHandler} selected={category}/>
          <input autoFocus onChange={nameHandler} value={name} type={'text'}
                 placeholder={'Введите название продукта'}/>
          <input onChange={descriptionHandler} value={description} type={'text'}
                 placeholder={'Введите описание'}/>
          <input onChange={priceHandler} value={price} type={'text'}
                 placeholder={'Введите цену продукта'}/>
          <UploadInput setPhoto={photoHandler} photo={photo}/>
        </Modal>}
      <CreateBlock title={'Блюда'} buttonName={'Добавить блюдо'}
                   handler={openHandler}/>
      <div>
        {!isLoading && <AdminItems>
          {products.map(
            product => <AdminItem editHandler={editHandler}
                                  deleteHandler={deleteProductHandler}
                                  title={`${product.name}`}
                                  id={product.id}
                                  key={product.id}/>)}
        </AdminItems>}
      </div>
    </div>
  );
};

export default Products;