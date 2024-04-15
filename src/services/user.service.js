import {$api, SERVER_URL} from '../lib/axios.js';
import axios from 'axios';

class UserService {
  async verifyToken() {
    return axios.get(SERVER_URL + '/api/user/refresh', {withCredentials: true});
  }

  async checkAuth() {
    const {data} = await axios.get(SERVER_URL + '/api/user/refresh',
      {withCredentials: true});
    localStorage.setItem('token', data.accessToken);
    return data;
  }

  async login(name, password) {
    return axios.post(SERVER_URL + '/api/user/login', {
      name, password,
    }, {withCredentials: true});
  }

  async create(body) {
    return $api.post('/api/user/create', body);
  }

  async delete(id) {
    return $api.delete(`/api/user/delete/${id}`);
  }

  async update(id, body) {
    return $api.patch(`/api/user/update/${id}`, body);
  }

  async findAll() {
    return $api.get('/api/user/findAll');
  }

  async findOne(id) {
    return $api.get(`/api/user/findOne/${id}`);
  }

}

export default new UserService();