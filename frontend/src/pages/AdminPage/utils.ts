import axios from 'axios';
import { API_V1_URL } from '../../constants';

export const getAllMotorcycle = async () => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCards`);

  return response.data;
};

export const removeMotorcycleCard = async (id: string) => {
  const response = await axios.delete(`${API_V1_URL}/motorcycleCards/${id}`);

  return response;
};

export const getMotorcycleCardById = async (id: string) => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCard/${id}`);

  return response;
};
