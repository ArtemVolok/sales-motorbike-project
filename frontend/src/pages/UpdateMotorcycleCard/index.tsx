import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { IMotorcycleCard } from '../CatalogMotorcycles/types';
import { ISuccessCreateMotorcycleCard } from '../CreateMotorcycleCard/types';
import { IServerError } from '../../requestTest/types';

import XMark from '../../assets/xmark-solid.svg?react';

import FormCreateMotorcycleCard from '../../components/FormCreateMotorcycleCard';
import { getMotorcycleCardById, updateMotorcycleCard } from '../../requestTest';
import { AdminPageUrl } from '../../UrlsConfig';

import '../CreateMotorcycleCard/style.scss';

const UpdateMotorcycleCard = () => {
  const navigate = useNavigate();
  const { id: idFromUrl } = useParams();

  const {
    data: motorcycleCardData,
    isLoading,
    error,
  } = useQuery<
    AxiosResponse<{ response: IMotorcycleCard }>,
    AxiosError<IServerError>
  >(['motorcycleCard', idFromUrl], {
    queryFn: () => getMotorcycleCardById(idFromUrl!),
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
    cacheTime: 0,
  });

  const { data: dataFromUpdate, mutate } = useMutation<
    AxiosResponse<ISuccessCreateMotorcycleCard>,
    AxiosError<IServerError>,
    { data: FormData; id: string }
  >('updateMotorcycleCard', {
    mutationFn: updateMotorcycleCard,
  });

  const requestFunction = (data: FormData) => {
    mutate({ data, id: idFromUrl! });
  };

  useEffect(() => {
    if (dataFromUpdate?.data.message) {
      navigate(AdminPageUrl);
    }
  }, [dataFromUpdate, navigate]);

  return (
    <div className="wrapperCreateCard">
      <div className="createCard">
        <div className="createCard__titlePage">
          <div className="createCard__title">
            <h2>
              Редагування карточки мотоциклу -{' '}
              {motorcycleCardData?.data.response.name}{' '}
            </h2>
            <div className="barsSolidSvg">
              {/* //TODO: create modal for confirm */}
              <XMark onClick={() => navigate(AdminPageUrl)} />
            </div>
          </div>
          <p className="createCard__paragraph">
            Замініть необхідні поля нижче для редагування карточки мотоциклу
          </p>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!!motorcycleCardData?.data.response && (
              <FormCreateMotorcycleCard
                motorcycleInfo={motorcycleCardData?.data.response}
                requestFunction={requestFunction}
              />
            )}
            {error?.code && (
              <h3 className="requestError">{error.response?.data.message}</h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateMotorcycleCard;
