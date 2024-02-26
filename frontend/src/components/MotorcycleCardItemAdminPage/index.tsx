import { useEffect } from 'react';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_V1_URL } from '../../constants';
import {
  IMotorcycleCardAdmin,
  ISuccessDeleteMotorcycleResponse,
} from './types';
import { IError } from '../../pages/CatalogMotorcycles/types';
import TrashBox from '../../assets/trash-solid.svg?react';
import Pencil from '../../assets/pencil-solid.svg?react';
import './style.scss';

const removeMotorcycleCard = async (id: string) => {
  const response = await axios.delete(
    `${API_V1_URL}/motorcycleCards/remove/:${id}`,
  );
  return response;
};

const MotorcycleCardItemAdminPage = ({
  props,
}: {
  props: IMotorcycleCardAdmin;
}) => {
  const { _id, name, vendorCode, price, refetch, setDeleteMotorcycleResponse } =
    props;

  const { mutate, data, error } = useMutation<
    AxiosResponse<ISuccessDeleteMotorcycleResponse>,
    AxiosError<IError> | null,
    string
  >({
    mutationFn: () => removeMotorcycleCard(_id),
  });

  const removeMotorcycle = () => {
    mutate(_id);
  };

  useEffect(() => {
    if (!!error && error.response?.data) {
      setDeleteMotorcycleResponse(error.response.data);
    }
    if (!!data && data.data) setDeleteMotorcycleResponse(data.data);
    refetch();
  }, [refetch, data, error, setDeleteMotorcycleResponse]);

  return (
    <div className="adminMotorcycleCard">
      <th className="adminMotorcycleCard__th-id">
        {_id ? _id : 'Дані відсутні'}
      </th>
      <th className="adminMotorcycleCard__th">
        {name ? name : 'Дані відсутні'}
      </th>
      <th className="adminMotorcycleCard__th">
        {vendorCode ? vendorCode : 'Дані відсутні'}
      </th>
      <th className="adminMotorcycleCard__th">
        {price ? price : 'Дані відсутні'}
      </th>
      <th className="optionBlock">
        <Pencil className="optionBlock__edit" />
        <TrashBox
          onClick={() => removeMotorcycle()}
          className="optionBlock__remove"
        />
      </th>
    </div>
  );
};

export default MotorcycleCardItemAdminPage;
