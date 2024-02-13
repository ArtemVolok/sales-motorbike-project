import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import {
  ETypeInput,
  INewMotorcycleCard,
  defaultValueMotorcycleCard,
  listInputs,
} from './types';
import { createMotorcycleCartSchema } from './utils';
import { DashboardUrl } from '../../UrlsConfig';
import XMark from '../../assets/xmark-solid.svg?react';

import './style.scss';

const CreateMotorcycleCartPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<INewMotorcycleCard>({
    mode: 'onChange',
    defaultValues: defaultValueMotorcycleCard,
    resolver: yupResolver(createMotorcycleCartSchema),
  });

  const onSubmit: SubmitHandler<INewMotorcycleCard> = (
    data: INewMotorcycleCard,
  ) => {
    console.log('data', data);
  };

  return (
    <div className="wrapper">
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
          <div className="createCard__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              {listInputs.map((el, index: number) => {
                const errorName = `${el.registerName}` as keyof typeof errors;

                if (el.type === ETypeInput.SELECT) {
                  return (
                    <div key={el.label} className="form__select">
                      <label>
                        <p className="form__label">{el.label}</p>
                        <select
                          className="form__select-select"
                          {...register(
                            el.registerName as keyof INewMotorcycleCard,
                          )}
                          id={el.label}
                        >
                          {el.data.map((el, index: number) => {
                            return (
                              <option
                                className="form__select-option"
                                value={el.type}
                                key={index}
                              >
                                {el.name}
                              </option>
                            );
                          })}
                        </select>
                        {errors[errorName] && (
                          <p className="form__error">
                            {errors[errorName]?.message}
                          </p>
                        )}
                      </label>
                    </div>
                  );
                }

                if (el.type === ETypeInput.CHECKBOX) {
                  return (
                    <div key={index} className="form__checkbox">
                      <p className="form__label">{el.label}</p>
                      <div className="form__checkbox-block">
                        {el.data.map((color, index: number) => {
                          return (
                            <div className="checkboxBlock" key={index}>
                              <input
                                id={color}
                                className="checkboxItem"
                                type={ETypeInput.CHECKBOX}
                                value={color}
                                {...register(
                                  el.registerName as keyof INewMotorcycleCard,
                                )}
                              />
                              <label
                                className={classNames(
                                  `checkboxLabel ${color}-background`,
                                )}
                                htmlFor={color}
                              ></label>
                            </div>
                          );
                        })}
                      </div>

                      {errors[errorName] && (
                        <p className="form__error">
                          {errors[errorName]?.message}
                        </p>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={index} className="form__input">
                    <label>
                      <p className="form__label">{el.label}</p>
                      <input
                        className="form__input-input"
                        {...register(
                          el.registerName as keyof INewMotorcycleCard,
                        )}
                        type={el.type}
                      />
                      {errors[errorName] && (
                        <p className="form__error">
                          {errors[errorName]?.message}
                        </p>
                      )}
                    </label>
                  </div>
                );
              })}
              <div className="createCard__buttonBlock">
                <button type="button" className="buttonBlock-cancel">
                  Вийти
                </button>
                <button type="submit" className="buttonBlock-submit">
                  Відправити
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMotorcycleCartPage;
