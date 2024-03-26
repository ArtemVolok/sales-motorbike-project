import * as yup from 'yup';

import {
  funcNumericValidator,
  numericValidator,
} from '../../pages/CreateMotorcycleCard/utils';

import {
  EFuelInjection,
  ETypeBrakes,
  ETypeCooling,
  ETypeMotorcycle,
} from './types';

export const updateMotorcycleSchema = yup
  .object()
  .shape({
    uploadImage: yup.object().shape({
      path: yup.string().required(),
      filename: yup.string().required(),
      originalname: yup.string().required(),
      size: yup.number().required(),
    }),
    _id: yup.string().required('This field is required!').max(255),
    _v: numericValidator,
    name: yup.string().required('This field is required!').max(255),
    price: funcNumericValidator('This field is required!'),
    vendorCode: yup.string().required('This field is required!').max(255),
    typeMotorcycle: yup
      .mixed<ETypeMotorcycle>()
      .oneOf(Object.values(ETypeMotorcycle))
      .required('This field is required!'),
    typeBrakes: yup
      .mixed<ETypeBrakes>()
      .oneOf(Object.values(ETypeBrakes))
      .required('This field is required!'),
    fuelInjection: yup
      .mixed<EFuelInjection>()
      .oneOf(Object.values(EFuelInjection))
      .required('This field is required!'),
    typeCooling: yup
      .mixed<ETypeCooling>()
      .oneOf(Object.values(ETypeCooling))
      .required('This field is required!'),
    horsePower: numericValidator,
    weight: numericValidator,
    fuelTank: numericValidator,
    fuelConsumption: numericValidator,
    cubicCapacity: numericValidator,
    maxSpeed: numericValidator,
    numberOfGears: numericValidator,
    availableColors: yup
      .array()
      .of(yup.string().required('This field is required!'))
      .min(1, 'Select min 1 color')
      .required('This field is required!'),
  })
  .required();
