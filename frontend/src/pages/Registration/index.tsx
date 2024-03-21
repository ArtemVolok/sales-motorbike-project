import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError, AxiosResponse } from 'axios';

import { registrationFormInputs, registrationSchema } from './utils';

import Eye from '../../assets/eye-solid.svg?react';
import EyeSlash from '../../assets/eye-slash-solid.svg?react';

import { LoginUrl } from '../../UrlsConfig';
import {
  ICreateUserProfileData,
  IRegistrationForm,
  ISuccessCreateUserProfile,
} from './types';
import { createUserProfile } from '../../requestTest';
import { IServerError } from '../../requestTest/types';

import './style.scss';

const Registration = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, data, isLoading, error } = useMutation<
    AxiosResponse<ISuccessCreateUserProfile>,
    AxiosError<IServerError>,
    ICreateUserProfileData
  >({
    mutationFn: createUserProfile,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    mode: 'onBlur',
    defaultValues: {},
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data: IRegistrationForm) => {
    const { email, name, password, phoneNumber, surname } = data;
    const preparedData = { email, name, password, phoneNumber, surname };
    mutate(preparedData);
  };

  useEffect(() => {
    if (data?.data.accessToken) {
      localStorage.setItem('token', data?.data.accessToken);
    }
  }, [data]);

  return (
    <div className="registrationWrapper">
      <div className="registration">
        <h3 className="registration__title">Реєстрація</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="registration__form">
          {registrationFormInputs.map((el) => {
            const errorName = `${el.registerName}` as keyof typeof errors;

            if (
              el.registerName !== 'password' &&
              el.registerName !== 'confPassword'
            ) {
              return (
                <label
                  htmlFor={el.registerName}
                  key={el.registerName}
                  className="form__label"
                >
                  <p className="form__label-paragraph">{el.label}</p>
                  <>
                    <input
                      {...register(el.registerName as keyof IRegistrationForm)}
                      type={el.type}
                      id={el.registerName}
                      className="form__label-input"
                    />
                    {errors[errorName] && (
                      <p className="form__label-error">
                        {errors[errorName]?.message}
                      </p>
                    )}
                  </>
                </label>
              );
            }

            return (
              <label
                htmlFor={el.registerName}
                key={el.registerName}
                className="form__label"
              >
                <p className="form__label-paragraph">{el.label}</p>
                <div className="passwordInput">
                  <input
                    {...register(el.registerName as keyof IRegistrationForm)}
                    type={showPassword ? 'text' : 'password'}
                    id={el.registerName}
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
                {errors[errorName] && (
                  <p className="form__label-error">
                    {errors[errorName]?.message}
                  </p>
                )}
              </label>
            );
          })}
          <button
            type="submit"
            className="registration__submitButton"
            disabled={isLoading}
          >
            {isLoading ? <p>Loading...</p> : <p>Зареєструватися</p>}
          </button>

          {!!error && !!error.response?.data && (
            <p className="errorRegistration">{error.response.data.message}</p>
          )}

          {!!data && !!data.data.accessToken && (
            <p className="successRegistration">Ви успішно зареєструвалися!</p>
          )}
        </form>
        <Link to={LoginUrl} className="registration__link">
          Вжа зараєстровані?
        </Link>
      </div>
    </div>
  );
};

export default Registration;
