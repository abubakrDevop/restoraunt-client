export const countProducts = (products) => {
  return products.reduce((accumulator, product) => {
    const existingObject = accumulator.find((obj) => obj.id === product.id);

    if (existingObject) {
      existingObject.count += 1;
    } else {
      accumulator.push({...product, count: 1});
    }

    return accumulator;
  }, []);
};