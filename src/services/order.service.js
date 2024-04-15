import {$api, SERVER_URL} from '../lib/axios.js';
import axios from 'axios';

class OrderService {
  async findAll() {
    return $api.get('/api/order/findAll');
  }

  async findOne(id) {
    return $api.get(`/api/order/findOne/${id}`);
  }

  async changeStatus(id, body) {
    return $api.patch(`/api/order/changeStatus/${id}`, body);
  }

  async create(body) {
    return axios.post(SERVER_URL + '/api/order/create', body);
  }
}

export default new OrderService();