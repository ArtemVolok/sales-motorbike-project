import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

import Eye from '../../assets/eye-solid.svg?react';
import EyeSlash from '../../assets/eye-slash-solid.svg?react';

import { RegistrationUrl } from '../../UrlsConfig';
import { IMotorcycleCard } from '../CatalogMotorcycles/types';
import { loginSchema } from './utils';
import { ILoginForm } from './types';
import { ISuccessCreateUserProfile } from '../Registration/types';
import { getAllMotorcycle, loginRequest } from '../../request';
import { IServerError } from '../../request/types';

import '../Registration/style.scss';
import './style.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, data, isLoading, error } = useMutation<
    AxiosResponse<ISuccessCreateUserProfile>,
    AxiosError<IServerError>,
    ILoginForm
  >({
    mutationFn: loginRequest,
  });

  const {
    data: dataMoto,
    isLoading: isLoadingMoto,
    error: errorMoto,
    refetch,
  } = useQuery<AxiosResponse<IMotorcycleCard[]>>('getAllMotorcycle', {
    queryFn: getAllMotorcycle,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log('dataMoto', dataMoto);
    console.log('isLoadingMoto', isLoadingMoto);
    console.log('errorMoto', errorMoto);
  }, [dataMoto, isLoadingMoto, errorMoto]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: 'onBlur',
    defaultValues: {},
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: ILoginForm) => {
    mutate(data);
  };

  useEffect(() => {
    if (data?.data.accessToken) {
      localStorage.setItem('token', data.data.accessToken);
    }
  }, [data]);

  const getAllMoto = () => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      console.log('please authorized!');
      return;
    }

    refetch();
  };

  return (
    <div className="registrationWrapper loginWrapper">
      <div className="registration login">
        <div>
          {data?.data.accessToken ? (
            <p>You authorized</p>
          ) : (
            <p>AUTHORIZATION please!!!</p>
          )}
        </div>
        <h3 className="registration__title">Авторизація</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="registration__form">
          <label htmlFor="email" className="form__label">
            <p className="form__label-paragraph">Логін</p>
            <>
              <input
                {...register('email')}
                type="text"
                id="login"
                className="form__label-input"
              />
              {!!errors && (
                <p className="form__label-error">{errors.email?.message}</p>
              )}
            </>
          </label>
          <label htmlFor="password" className="form__label">
            <p className="form__label-paragraph">Пароль</p>
            <div className="passwordInput">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form__label-input"
              />
              {showPassword ? (
                <Eye
                  className="inputEye"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeSlash
                  className="inputEye"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            {!!errors && (
              <p className="form__label-error">{errors.password?.message}</p>
            )}
          </label>
          <div className="passwordInput">
            <button
              type="submit"
              className="registration__submitButton"
              disabled={isLoading}
            >
              {isLoading ? <p>Loading...</p> : <p>Логін</p>}
            </button>
          </div>
          {!!error && !!error.response?.data && (
            <p className="errorRegistration">{error.response.data.message}</p>
          )}

          {!!data && !!data.data.payload.userEmail && (
            <p className="successRegistration">Ви успішно залогінились!</p>
          )}
        </form>
        <Link to={RegistrationUrl} className="registration__link">
          Ще не зареєстровані?
        </Link>
        <button onClick={() => getAllMoto()}>Get all moto</button>
      </div>
    </div>
  );
};

export default Login;
