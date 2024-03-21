import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import XMark from '../../assets/xmark-solid.svg?react';
import { AdminPageUrl, DashboardUrl } from '../../UrlsConfig';
import FormCreateMotorcycleCard from '../../components/FormCreateMotorcycleCard';

import './style.scss';
import { uploadMotorcycleCardData } from '../../Requests';
import { IUpdateMotorcycleCard } from '../UpdateMotorcycleCard/types';
import { IServerError } from '../../Requests/types';
import { ISuccessCreateMotorcycleCard } from './types';

const CreateMotorcycleCardPage = () => {
  const navigate = useNavigate();

  const { mutate, data } = useMutation<
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
              <XMark onClick={() => navigate(DashboardUrl)} />
            </div>
          </div>
          <p className="createCard__paragraph">
            Заповінть поля нижче для створення нової карточки мотоциклу
          </p>
        </div>
        <FormCreateMotorcycleCard requestFunction={requestFunction} />
      </div>
    </div>
  );
};

export default CreateMotorcycleCardPage;
