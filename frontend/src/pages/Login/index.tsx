import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

import Eye from '../../assets/eye-solid.svg?react';
import EyeSlash from '../../assets/eye-slash-solid.svg?react';

import { RegistrationUrl } from '../../UrlsConfig';
import { IError } from '../CatalogMotorcycles/types';
import { loginSchema } from './utils';
import { ILoginForm } from './types';
import { loginRequest } from '../../Requests';

import '../Registration/style.scss';
import './style.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, data, isLoading, error } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<IError> | null,
    ILoginForm
  >({
    mutationFn: loginRequest,
  });

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
  return (
    <div className="registrationWrapper loginWrapper">
      <div className="registration login">
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
              {!!errors && (
                <p className="form__label-error">{errors.password?.message}</p>
              )}
            </div>
          </label>
          <div className="passwordInput">
            <button
              type="submit"
              className="registration__submitButton"
              disabled={isLoading}
            >
              {isLoading ? <p>Loading...</p> : <p>Зареєструватися</p>}
            </button>
          </div>
          {!!error && !!error.response?.data && (
            <p className="errorRegistration">
              {error.response.data.errorMessage}
            </p>
          )}

          {!!data && !!data.data.message && (
            <p className="successRegistration">Ви успішно зареєструвалися!</p>
          )}
        </form>
        <Link to={RegistrationUrl} className="registration__link">
          Ще не зареєстровані?
        </Link>
      </div>
    </div>
  );
};

export default Login;
