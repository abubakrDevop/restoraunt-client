import {useEffect, useState} from 'react';
import UserService from '../services/user.service.js';
import UserStore from '../stores/user.store.js';

export const useAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    const authHandler = async () => {
      try {
        const authData = await UserService.checkAuth();
        if (authData) {
          setAuth(true);
          UserStore.setUser(authData.user);
          UserStore.setAuth(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    authHandler();
  }, []);

  return {isLoading, isAuth};
};