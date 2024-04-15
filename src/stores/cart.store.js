import {makeAutoObservable, toJS} from 'mobx';

class CartStore {
  cart = [];

  constructor() {
    makeAutoObservable(this);
  }

  addProduct(product) {
    this.cart.push(product);
  }

  deleteProduct(product) {
    this.cart = this.cart.filter(item => item.id !== product.id);
  }
}

export default new CartStore();