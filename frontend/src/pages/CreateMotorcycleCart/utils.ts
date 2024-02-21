import * as yup from 'yup';
import {
  EFuelInjection,
  ETypeBrakes,
  ETypeCooling,
  ETypeMotorcycle,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformNumeric = (value: any, originalValue: any) => {
  return !isNaN(originalValue) && originalValue !== null && originalValue !== ''
    ? value
    : undefined;
};

const funcNumericValidator = (message: string) => {
  return yup
    .number()
    .required(message)
    .typeError('This field should be a number!')
    .nullable()
    .positive('Only positive number!')
    .transform(transformNumeric);
};

const numericValidator = yup
  .number()
  .required('This field is required!')
  .typeError('This field should be a number!')
  .nullable()
  .positive('Only positive number!')
  .transform(transformNumeric);

export const createMotorcycleCartSchema = yup
  .object()
  .shape({
    uploadImage: yup
      .mixed<File>()
      .required('File required')
      .nullable()
      .test(
        'required',
        'You need to provide a file!',
        (value) => value !== null,
      ),

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
    password: yup.string().required('This field is required!'),
  })
  .required();
