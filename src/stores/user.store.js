import {makeAutoObservable} from 'mobx';

class UserStore {
  isAuth;
  user;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }
}

export default new UserStore();