import axios from 'axios';
import { API_V1_URL } from '../../constants';

export const getCatalogMotorcycle = async () => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCards`);

  return response.data;
};
