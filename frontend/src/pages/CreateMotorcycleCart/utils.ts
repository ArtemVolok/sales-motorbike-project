import * as yup from 'yup';
import {
  EFuelInjection,
  ETypeBrakes,
  ETypeCooling,
  ETypeMotorcycle,
} from './types';

//TODO: save for future generations
// .transform((_, val) => {
//   console.log('value', val);
//   console.log('isNaN', isNaN(val));
//   if (!isNaN(val) && val !== null && val !== '') {
//     // console.log('val', typeof val);
//     console.log('inside');

//     return +val;
//   } else {
//     console.log('vlad');
//     return undefined;
//   }
// })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformNumeric = (value: any, originalValue: any) => {
  return !isNaN(originalValue) && originalValue !== null && originalValue !== ''
    ? value
    : undefined;
};

//TODO:
// необходимо для того, чтобы каждый раз заново дергать yup чтобы
// получать уникальные значения, проблема гипотететическая
const funcNumericValidator = () => {
  return yup
    .number()
    .required('This field is required!')
    .typeError('This field should be a number!')
    .nullable()
    .transform(transformNumeric);
};

//TODO:
// константа создает одну ссылку на данные с yup (валидатор),
// которыей может возвращать одто и тоже значения для разныъ инпутом
// и они будут валидироватся одновременно
const numericValidator = yup
  .number()
  .required('This field is required!')
  .typeError('This field should be a number!')
  .nullable()
  .transform(transformNumeric);

export const createMotorcycleCartSchema = yup
  .object()
  .shape({
    name: yup.string().required('This field is required!'),
    price: funcNumericValidator(),
    vendorCode: yup.string().required('This field is required!'),
    typeMotorcycle: yup
      .mixed<ETypeMotorcycle>()
      .oneOf(Object.values(ETypeMotorcycle))
      .required(),
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
