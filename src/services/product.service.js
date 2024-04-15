import {$api, SERVER_URL} from '../lib/axios.js';
import axios from 'axios';

class ProductService {
  async findAll() {
    return axios.get(SERVER_URL + '/api/product/findAll');
  }

  async findAllActive() {
    return axios.get(SERVER_URL + '/api/product/findAllActive');
  }

  async findOne(id) {
    return $api.get(`/api/product/findOne/${id}`);
  }

  async create(body) {
    return $api.post('/api/product/create', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async delete(id) {
    return $api.delete(`/api/product/delete/${id}`);
  }

  async update(id, body) {
    return $api.patch(`/api/product/update/${id}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new ProductService();