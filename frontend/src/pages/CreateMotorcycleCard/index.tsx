import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import XMark from '../../assets/xmark-solid.svg?react';
import { AdminPageUrl } from '../../UrlsConfig';
import FormMotorcycleCard from '../../components/FormMotorcycleCard';

import { uploadMotorcycleCardData } from '../../request';
import { IUpdateMotorcycleCard } from '../UpdateMotorcycleCard/types';
import { IServerError } from '../../request/types';
import { ISuccessCreateMotorcycleCard } from './types';

import './style.scss';

const CreateMotorcycleCardPage = () => {
  const navigate = useNavigate();

  const { mutate, data, error } = useMutation<
    AxiosResponse<ISuccessCreateMotorcycleCard>,
    AxiosError<IServerError>,
    FormData
  >('uploadMotorcycleCard', {
    mutationFn: uploadMotorcycleCardData,
  });

  const requestFunction = (data: IUpdateMotorcycleCard | FormData) => {
    mutate(data as FormData);
  };

  useEffect(() => {
    if (data?.data.message) {
      navigate(AdminPageUrl);
    }
  }, [data, navigate]);

  return (
    <div className="wrapperCreateCard">
      <div className="createCard">
        <div className="createCard__titlePage">
          <div className="createCard__title">
            <h2>Створення нової карточки мотоциклу</h2>
            <div className="barsSolidSvg">
              {/* //TODO: create modal for confirm */}
              <XMark onClick={() => navigate(AdminPageUrl)} />
            </div>
          </div>
          <p className="createCard__paragraph">
            Заповінть поля нижче для створення нової карточки мотоциклу
          </p>
        </div>
        <FormMotorcycleCard requestFunction={requestFunction} />
        {error?.code && (
          <h3 className="requestError">{error.response?.data.message}</h3>
        )}
      </div>
    </div>
  );
};

export default CreateMotorcycleCardPage;
