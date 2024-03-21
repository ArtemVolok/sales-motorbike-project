import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

import DownloadFile from '../../assets/download-solid.svg?react';
import { API_V1_URL } from '../../constants';
import './style.scss';

interface IFormCreateMotorcycleCard {
  motorcycleInfo?: IMotorcycleCard | undefined;
  requestFunction: (data: FormData) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormCreateMotorcycleCard: React.FC<IFormCreateMotorcycleCard> = ({
  motorcycleInfo,
  requestFunction,
}) => {
  const {
    availableColors,
    cubicCapacity,
    fuelConsumption,
    fuelInjection,
    fuelTank,
    horsePower,
    maxSpeed,
    name,
    numberOfGears,
    price,
    typeBrakes,
    typeCooling,
    typeMotorcycle,
    vendorCode,
    weight,
    uploadImage: updatedUploadedImage,
  } = { ...motorcycleInfo };

  const preparedValues = {
    availableColors: availableColors
      ? availableColors[0].split(',')
      : availableColors,
    cubicCapacity,
    fuelConsumption,
    fuelInjection,
    fuelTank,
    horsePower,
    maxSpeed,
    name,
    numberOfGears,
    price,
    typeBrakes,
    typeCooling,
    typeMotorcycle,
    vendorCode,
    weight,
  };

  const [useDrag, setUseDrag] = useState<boolean>(false);
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
    defaultValues: motorcycleInfo ? preparedValues : defaultValueMotorcycleCard,
    resolver: yupResolver(createMotorcycleCartSchema),
  });

  const onSubmit: SubmitHandler<INewMotorcycleCard> = async (
    data: INewMotorcycleCard,
  ) => {
    if (motorcycleInfo && displayUpdatedImage) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ['uploadImage']: _, ...preparedData } = data;

      const formData = new FormData();

      Object.entries(preparedData as IUpdateMotorcycleCard).forEach(
        ([key, value]) => {
          formData.append(key, value as string | Blob);
        },
      );

      requestFunction(formData);
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    requestFunction(formData);
  };

  const dragStartHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setUseDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setUseDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const photo = [...e.dataTransfer.files];
    handleFiles(photo[0]);

    setUseDrag(false);
  };

  const handleFiles = (file: File | null) => {
    if (file?.type !== 'image/png') {
      return setError('uploadImage', {
        message: 'File should be a photo png type!',
      });
    }
    setUploadPhoto(file);
    setValue('uploadImage', file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    handleFiles(file ? file[0] : null);
  };

  const removeUploadPhoto = () => {
    setPreview('');
    setUploadPhoto(null);
    setValue('uploadImage', null);
    setDisplayUpdatedImage(false);
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
      const fakeFile = new File(['content'], 'example.jpg', {
        type: 'image/jpeg',
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
            <>
              <p className="dndBlock-paragraph">
                Прикріпіть фото мотоциклу нижче
              </p>
              <label
                className={classNames(
                  `dndBlock-inputDnd ${useDrag ? 'release' : 'attach'}`,
                )}
                onDragStart={(e) => {
                  dragStartHandler(e);
                }}
                onDragLeave={(e) => {
                  dragLeaveHandler(e);
                }}
                onDragOver={(e) => {
                  dragStartHandler(e);
                }}
                onDrop={(e) => onDropHandler(e)}
              >
                <div className="dnd-inner">
                  {useDrag ? (
                    <p className="paragraph-release">
                      Відпустіть зображення для загрузки
                    </p>
                  ) : (
                    <div>
                      <div className="dnd-uploadSvg">
                        <DownloadFile />
                      </div>
                      <h3 className="inner-title">
                        Перетащіть зображення для загрузки
                      </h3>
                      <p className="inner-paragraph">
                        або просто натисніть на це поле
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="dnd-input"
                    accept="image/*"
                    onChange={handleInputChange}
                    id="uploadFile"
                  />
                </div>
              </label>
            </>
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
          <button type="button" className="buttonBlock-cancel">
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

export default FormCreateMotorcycleCard;
