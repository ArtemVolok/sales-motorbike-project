import axios from 'axios';

import $api from '../interceptor';
import { API_V1_URL } from '../constants';
import { ICreateUserProfileData } from '../pages/Registration/types';
import { ILoginForm } from '../pages/Login/types';

export const getAllMotorcycle = async () => {
  const response = await $api.get('/motorcycleCardsAdmin');

  return response.data;
};

export const removeMotorcycleCard = async (id: string) => {
  const response = await $api.delete(`/motorcycleCards/${id}`);

  return response;
};

export const getMotorcycleCardById = async (id: string) => {
  const response = await axios.get(`${API_V1_URL}/motorcycleCard/${id}`);

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
  const response = await $api.post('motorcycleCards', data);

  return response;
};

export const updateMotorcycleCard = async ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}) => {
  const response = await $api.put(`/motorcycleCard/${id}`, data);

  return response;
};

export const createUserProfile = async (data: ICreateUserProfileData) => {
  const response = await axios.post(`${API_V1_URL}/profileUser`, data);

  return response;
};

export const loginRequest = async (data: ILoginForm) => {
  const response = await axios.post(
    `${API_V1_URL}/login`,
    {
      ...data,
    },
    { withCredentials: true },
  );

  return response;
};

export const activationRequest = async (activationLink: string) => {
  const response = await axios.get(
    `${API_V1_URL}/activation/${activationLink}`,
  );

  return response;
};

export const logoutRequest = async () => {
  //TODO: do need add $api?
  // const response = await $api.post('/logout');

  const response = await axios.post(
    `${API_V1_URL}/logout`,
    {},
    { withCredentials: true },
  );

  return response;
};

console.log('test console.log');
