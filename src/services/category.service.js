import {$api, SERVER_URL} from '../lib/axios.js';
import axios from 'axios';

class CategoryService {
  async findAll() {
    return axios.get(SERVER_URL + '/api/category/findAll');
  }

  async findOne(id) {
    return $api.get(`/api/category/findOne/${id}`);
  }

  async create(body) {
    return $api.post('/api/category/create', body);
  }

  async delete(id) {
    return $api.delete(`/api/category/delete/${id}`);
  }

  async update(id, body) {
    return $api.patch(`/api/category/update/${id}`, body);
  }
}

export default new CategoryService();