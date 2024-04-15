import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {clearInputs} from '../utils/clearInputs.js';
import {useModal} from './useModal.js';
import TableService from '../services/table.service.js';
import {bookedStatus} from '../constants/constants.js';

export const useTables = () => {
  const {
    isActive,
    isEditActive,
    setEditActive,
    setActive,
    openHandler,
    openEditHandler,
  } = useModal();
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [booked, setBooked] = useState({});
  const [tableId, setTableId] = useState('');
  const [countProduct, setCountProduct] = useState(0);
  const [countPrice, setCountPrice] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState({});

  const numberHandler = (e) => setNumber(e.target.value);
  const codeHandler = (e) => setCode(e.target.value);

  const bookedHandler = (status) => setBooked(status);
  const closeHandler = () => {
    setActive(false);
    setEditActive(false);
    clearInputs([setNumber]);
    setBooked({});
  };

  const fetchTables = async () => {
    try {
      const {data} = await TableService.findAll();
      setTables(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const createTableHandler = async () => {
    try {
      await TableService.create({number});
      await fetchTables();
      toast.success('Стол добавлен');
      closeHandler();
      clearInputs([setNumber]);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const editHandler = async (id) => {
    try {
      const {data} = await TableService.findOneStats(id);
      setTable(data.table);
      setTableId(data.table.id);
      setNumber(data.table.number);
      setCode(data.table.code || '');
      setBooked(!data.table.isBooked ? bookedStatus[1] : bookedStatus[0]);
      setCountProduct(data.countProduct);
      setCountPrice(data.countPrice);
      openEditHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const updateTableHandler = async () => {
    try {
      await TableService.update(table?.id, {
        number,
        isBooked: booked.title === bookedStatus[0].title,
        code: code || null,
      });
      await fetchTables();
      toast.success('Стол изменен');
      closeHandler();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  const deleteTableHandler = async (id) => {
    try {
      await TableService.delete(id);
      await fetchTables();
      toast.success('Стол удален');
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || 'Ошибка');
    }
  };

  useEffect(() => {
    fetchTables().finally(() => setLoading(false),
    );
  }, []);

  return {
    countProduct,
    countPrice,
    tableId,
    number,
    numberHandler,
    code,
    codeHandler,
    booked,
    bookedHandler,
    tables,
    isLoading,
    createTableHandler,
    deleteTableHandler,
    updateTableHandler,
    editHandler,
    isActive,
    isEditActive,
    openHandler,
    closeHandler,
  };
};