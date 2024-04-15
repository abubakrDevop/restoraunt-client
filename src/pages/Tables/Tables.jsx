import Modal from '../../components/Modal/Modal.jsx';
import CreateBlock from '../../components/CreateBlock/CreateBlock.jsx';
import AdminItems from '../../components/AdminItems/AdminItems.jsx';
import AdminItem from '../../components/AdminItem/AdminItem.jsx';
import {useTables} from '../../hooks/useTables.js';
import List from '../../components/List/List.jsx';
import {bookedStatus} from '../../constants/constants.js';

const Tables = () => {
  const {
    createTableHandler,
    deleteTableHandler,
    updateTableHandler,
    editHandler,
    tableId,
    countPrice,
    countProduct,
    number,
    numberHandler,
    code,
    codeHandler,
    booked,
    bookedHandler,
    isActive,
    isEditActive,
    isLoading,
    openHandler,
    closeHandler,
    tables,
  } = useTables();

  return (
    <div>
      {isEditActive &&
        <Modal edit handler={updateTableHandler}
               setActive={closeHandler}
               title={'Изменить стол'}>
          <a
            href={`${window.location.origin}/${tableId}`}>{`${window.location.origin}/${tableId}`}</a>
          <p>Количество блюд за день: {countProduct}</p>
          <p>Заработок: {countPrice || 0} руб.</p>
          <input autoFocus onChange={numberHandler} value={number} type={'text'}
                 placeholder={'Введите номер столика'}/>
          <input onChange={codeHandler} value={code} type={'text'}
                 placeholder={'Введите код доступа'}/>
          <List title={'Выберите статус...'} items={bookedStatus}
                selected={booked}
                handler={bookedHandler}/>
        </Modal>}
      {isActive &&
        <Modal handler={createTableHandler}
               setActive={closeHandler}
               title={'Добавить новый стол'}>
          <input autoFocus onChange={numberHandler} value={number} type={'text'}
                 placeholder={'Введите номер столика'}/>
        </Modal>}
      <CreateBlock title={'Столики'} buttonName={'Добавить новый столик'}
                   handler={openHandler}/>
      <div>
        {!isLoading && <AdminItems>
          {tables.map(
            table => <AdminItem dark={table.isBooked} editHandler={editHandler}
                                deleteHandler={deleteTableHandler}
                                title={`Стол #${table.number}`}
                                id={table.id}
                                key={table.id}/>)}
        </AdminItems>}
      </div>
    </div>
  );
};

export default Tables;