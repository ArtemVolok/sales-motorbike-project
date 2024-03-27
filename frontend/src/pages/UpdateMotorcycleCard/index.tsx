import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { IMotorcycleCard } from '../CatalogMotorcycles/types';
import { ISuccessCreateMotorcycleCard } from '../CreateMotorcycleCard/types';
import { IServerError } from '../../request/types';

import XMark from '../../assets/xmark-solid.svg?react';

import FormMotorcycleCard from '../../components/FormMotorcycleCard';
import { getMotorcycleCardById, updateMotorcycleCard } from '../../request';
import { AdminPageUrl } from '../../UrlsConfig';

import '../CreateMotorcycleCard/style.scss';

const UpdateMotorcycleCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: motorcycleCardData,
    isLoading,
    error,
  } = useQuery<
    AxiosResponse<{ response: IMotorcycleCard }>,
    AxiosError<IServerError>
  >(['motorcycleCard', id], {
    queryFn: () => getMotorcycleCardById(id!),
  });

  const { data: dataFromUpdate, mutate } = useMutation<
    AxiosResponse<ISuccessCreateMotorcycleCard>,
    AxiosError<IServerError>,
    { data: FormData; id: string }
  >('updateMotorcycleCard', {
    mutationFn: updateMotorcycleCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['motorcycleCard'] });
    },
  });

  const requestFunction = (data: FormData) => {
    mutate({ data, id: id! });
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
            <h2 className="createCard__title-heading">
              Редагування карточки мотоциклу -
              {motorcycleCardData?.data.response.name}
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
              <FormMotorcycleCard
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
