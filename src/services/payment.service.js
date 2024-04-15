import axios from 'axios';
import {$api, SERVER_URL} from '../lib/axios.js';

class PaymentService {
  async findAll() {
    return axios.get(SERVER_URL + '/api/payment/findAll');
  }

  async update(id, body) {
    return $api.patch(`/api/payment/update/${id}`, body);
  }
}

export default new PaymentService();