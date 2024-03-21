import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';

import { activationRequest } from '../../requests';
import { IServerError } from '../../requests/types';
import { LoginUrl } from '../../UrlsConfig';

import CheckMarkCircle from '../../assets/check-circle.svg?react';
import ErrorActivationMark from '../../assets/x-mark-circle.svg?react';

import './style.scss';

const Activation = () => {
  const { activationLink } = useParams();

  const {
    data: requestData,
    error,
    isLoading,
  } = useQuery<AxiosResponse<{ message: string }>, AxiosError<IServerError>>(
    'activation',
    {
      queryFn: () => activationRequest(activationLink!),
    },
  );

  return (
    <div className="activation">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!!requestData?.data.message && (
            <div className="activation__response">
              <div className="svgBlock">
                <CheckMarkCircle className="responseSvg successSvg" />
              </div>
              <h2 className="activation__response-title">
                Ви успішно зареєструвалися!
              </h2>
              <p className="activation__response-paragraph">
                Перейдіть на сторінку <Link to={LoginUrl}>логіну</Link> щоб
                авторизуватися на сайті.
              </p>
            </div>
          )}
          {!!error?.response && error.response.data.message && (
            <div className="activation__response">
              <div className="svgBlock">
                <ErrorActivationMark className="responseSvg errorSvg" />
              </div>
              <h2 className="activation__response-title">
                Нажаль трапилась помилка:
              </h2>
              <p className="activation__response-paragraph">
                {error.response.data.message}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Activation;
