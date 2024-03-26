import React, { useEffect, useState } from 'react';
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

import { createMotorcycleCartSchema } from '../../pages/CreateMotorcycleCard/utils';
import { IMotorcycleCard } from '../../pages/CatalogMotorcycles/types';
import { IUpdateMotorcycleCard } from '../../pages/UpdateMotorcycleCard/types';

import { API_V1_URL } from '../../constants';
import { AdminPageUrl } from '../../UrlsConfig';

import './style.scss';
import DNDBlock from '../DNDBlock';
import { createFormData } from '../../utils/createFormData';

interface IFormCreateMotorcycleCard {
  motorcycleInfo?: IMotorcycleCard;
  requestFunction: (data: FormData) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormMotorcycleCard: React.FC<IFormCreateMotorcycleCard> = ({
  motorcycleInfo, //
  requestFunction,
}) => {
  const navigate = useNavigate();
  const updatedUploadedImage = motorcycleInfo?.uploadImage;

  const getDefaultValues = () => {
    if (!motorcycleInfo) {
      return defaultValueMotorcycleCard;
    }

    const { uploadImage: _, availableColors, ...rest } = motorcycleInfo;

    return {
      ...rest,
      availableColors: availableColors
        ? availableColors[0].split(',')
        : availableColors,
    };
  };

  const [uploadPhoto, setUploadPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [displayUpdatedImage, setDisplayUpdatedImage] = useState<boolean>(
    motorcycleInfo ? true : false,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm<INewMotorcycleCard>({
    mode: 'onChange',
    defaultValues: getDefaultValues(),
    resolver: yupResolver(createMotorcycleCartSchema),
  });

  const onSubmit: SubmitHandler<INewMotorcycleCard> = async (
    data: INewMotorcycleCard,
  ) => {
    if (motorcycleInfo && displayUpdatedImage) {
      const { uploadImage: _, ...preparedData } = data;

      requestFunction(createFormData<IUpdateMotorcycleCard>(preparedData));
      return;
    }

    requestFunction(createFormData<INewMotorcycleCard>(data));
  };

  const removeUploadPhoto = () => {
    setPreview('');
    setUploadPhoto(null);
    setValue('uploadImage', null);
    setDisplayUpdatedImage(false);
  };

  const handleFiles = (file: File | null) => {
    if (file?.type !== 'image/png') {
      return setError('uploadImage', {
        type: 'manual',
        message: 'File should be a photo png type!',
      });
    }
    setUploadPhoto(file);
    setValue('uploadImage', file);
  };

  useEffect(() => {
    if (!uploadPhoto) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(uploadPhoto);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadPhoto]);

  useEffect(() => {
    if (updatedUploadedImage?.filename && displayUpdatedImage) {
      const fakeFile = new File(['content'], updatedUploadedImage.filename, {
        type: 'image/png',
      });
      setValue('uploadImage', fakeFile);
    }
  }, [updatedUploadedImage?.filename, setValue, displayUpdatedImage]);

  useEffect(() => {
    if (preview) {
      clearErrors('uploadImage');
    }
  }, [clearErrors, preview]);

  return (
    <div className="motorcycleCard__form">
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
                    {...register(el.registerName as keyof INewMotorcycleCard)}
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
                    <p className="form__error">{errors[errorName]?.message}</p>
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
                  <p className="form__error">{errors[errorName]?.message}</p>
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
                  {...register(el.registerName as keyof INewMotorcycleCard)}
                  type={el.type}
                  step={
                    el.registerName === 'horsePower' ||
                    el.registerName === 'fuelConsumption'
                      ? '0.01'
                      : '1'
                  }
                />
                {errors[errorName] && (
                  <p className="form__error">{errors[errorName]?.message}</p>
                )}
              </label>
            </div>
          );
        })}
        <div className="dndBlock">
          <h2 className="dndBlock-title">Загрузка фото</h2>
          {!preview && !displayUpdatedImage && (
            <DNDBlock handleFiles={handleFiles} />
          )}

          {(preview || displayUpdatedImage) && (
            <>
              <div className="dndBlock-preview">
                <img
                  src={
                    preview
                      ? preview
                      : `${API_V1_URL}/images/${updatedUploadedImage!.filename}`
                  }
                  alt="Your upload photo"
                  className="preview-img"
                />
                <div className="preview-info">
                  <p>
                    Назва фото:{' '}
                    {uploadPhoto?.name ||
                      updatedUploadedImage?.originalname ||
                      'Назва відсутня'}
                  </p>
                  {updatedUploadedImage && displayUpdatedImage ? (
                    <></>
                  ) : (
                    <p>Тип фото: {uploadPhoto?.type || 'Тип відсутній'}</p>
                  )}

                  <p>
                    Розмір фото:{' '}
                    {uploadPhoto?.size ||
                      updatedUploadedImage?.size ||
                      'Розмір відсутній'}{' '}
                    байт
                  </p>
                  <button
                    className="preview-info-button"
                    onClick={removeUploadPhoto}
                  >
                    Видалити фото
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {errors.uploadImage && (
          <p className="form__error">{errors.uploadImage.message}</p>
        )}

        <div className="buttonBlock">
          <button
            type="button"
            className="buttonBlock-cancel"
            onClick={() => navigate(AdminPageUrl)}
          >
            Вийти
          </button>
          <button type="submit" className="buttonBlock-submit">
            Відправити
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormMotorcycleCard;
