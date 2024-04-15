import {$api, SERVER_URL} from '../lib/axios.js';
import axios from 'axios';

class TableService {
  async findAll() {
    return $api.get('/api/table/findAll');
  }

  async findOne(id) {
    return $api.get(`/api/table/findOne/${id}`);
  }

  async findOneStats(id) {
    return $api.get(`/api/table/findOneStats/${id}`);
  }

  async create(body) {
    return $api.post('/api/table/create', body);
  }

  async delete(id) {
    return $api.delete(`/api/table/delete/${id}`);
  }

  async update(id, body) {
    return $api.patch(`/api/table/update/${id}`, body);
  }

  async checkCode(id, body) {
    return axios.post(SERVER_URL + `/api/table/checkCode/${id}`, body);
  }

  async callWaiter(id) {
    return axios.get(SERVER_URL + `/api/table/callWaiter/${id}`);
  }

  async bookTable(body) {
    return axios.post(SERVER_URL + '/api/table/bookTable', body);
  }
}

export default new TableService();