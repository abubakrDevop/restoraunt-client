export const clearInputs = (items) => {
  for (const item of items) {
    item('');
  }
};