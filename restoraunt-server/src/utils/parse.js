const ordersStatus = {
  CREATED: "Создан",
  PROGRESS: "В процессе",
  COMPLETE: "Завершен",
};

const parseOrderStatus = (status) => {
  return ordersStatus[status];
};

module.exports = {
  parseOrderStatus,
};
