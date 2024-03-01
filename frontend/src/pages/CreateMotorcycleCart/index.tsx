import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useMutation } from 'react-query';
import { createMotorcycleCartSchema } from './utils';
import { DashboardUrl } from '../../UrlsConfig';
import { uploadMotorcycleCardData } from '../../Requests';
import XMark from '../../assets/xmark-solid.svg?react';
import DownloadFile from '../../assets/download-solid.svg?react';
import {
  ETypeInput,
  INewMotorcycleCard,
  defaultValueMotorcycleCard,
  listInputs,
} from './types';

import './style.scss';

const CreateMotorcycleCartPage = () => {
  const navigate = useNavigate();

  const { mutate, data } = useMutation({
    mutationFn: (data: FormData) => uploadMotorcycleCardData(data),
  });

  console.log('mutation.data', data);

  const [useDrag, setUseDrag] = useState<boolean>(false);
  const [uploadPhoto, setUploadPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue,
  } = useForm<INewMotorcycleCard>({
    mode: 'onChange',
    defaultValues: defaultValueMotorcycleCard,
    resolver: yupResolver(createMotorcycleCartSchema),
  });

  const onSubmit: SubmitHandler<INewMotorcycleCard> = async (
    data: INewMotorcycleCard,
  ) => {
    console.log('data', data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    mutate(formData);
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
                        step="0.01"
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
              <div className="createCard__dnd">
                <h2 className="createCard__dnd-title">Загрузка фото</h2>
                {!preview && (
                  <>
                    <p className="createCard__dnd-paragraph">
                      Прикріпіть фото мотоциклу нижче
                    </p>
                    <label
                      className={classNames(
                        `createCard__dnd-inputDnd ${
                          useDrag ? 'release' : 'attach'
                        }`,
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
                    {errors.uploadImage && (
                      <p className="form__error">
                        {errors.uploadImage.message}
                      </p>
                    )}
                  </>
                )}

                {preview && (
                  <div className="createCard__dnd-preview">
                    <img
                      src={preview}
                      alt="Your upload photo"
                      className="preview-img"
                    />
                    <div className="preview-info">
                      <p>Назва фото: {uploadPhoto?.name || 'Назва відсутня'}</p>
                      <p>Тип фото: {uploadPhoto?.type || 'Тип відсутній'}</p>
                      <p>
                        Розмір фото: {uploadPhoto?.size || 'Розмір відсутній'}{' '}
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
                )}
              </div>

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
