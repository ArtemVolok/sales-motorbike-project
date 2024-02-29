import axios from 'axios';
import { API_V1_URL } from '../../constants';

export const getMotorcycleCard = async (id: string) => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCard/${id}`);

  return response;
};
