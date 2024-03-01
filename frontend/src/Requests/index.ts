import axios from 'axios';
import { API_V1_URL } from '../constants';
import { ICreateUserProfileData } from '../pages/Registration/types';

export const getAllMotorcycle = async () => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCards`);

  return response.data;
};

export const removeMotorcycleCard = async (id: string) => {
  const response = await axios.delete(`${API_V1_URL}/motorcycleCards/${id}`);

  return response;
};

export const getCatalogMotorcycle = async () => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCards`);

  return response.data;
};

export const getMotorcycleCard = async (id: string) => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCard/${id}`);

  return response;
};

export const uploadMotorcycleCardData = async (data: FormData) => {
  const response = await fetch(`${API_V1_URL}/motorcycleCards`, {
    method: 'POST',
    body: data,
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const createUserProfile = async (data: ICreateUserProfileData) => {
  const response = await axios.post(`${API_V1_URL}/profileUser`, data);

  return response;
};
