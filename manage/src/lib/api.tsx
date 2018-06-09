import axios, { IPostedData } from './axios';

export const user = {
  get() {
    return axios.get('/api/user');
  },

  del(data: IPostedData) {
    return axios.del('/api/user', data);
  }
};
