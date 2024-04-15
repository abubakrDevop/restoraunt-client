const ordersStatus = {
  PAYMENT: 'Оплата',
  CREATED: 'Создан',
  PROGRESS: 'В процессе',
  COMPLETE: 'Завершен',
};

export const parseOrderStatus = (status) => {
  return ordersStatus[status];
};