import * as yup from 'yup';
import { IRegistrationFormInputs } from './types';

export const registrationFormInputs: IRegistrationFormInputs[] = [
  { type: 'text', registerName: 'name', label: 'Ім`я' },
  { type: 'text', registerName: 'surname', label: 'Прізвище' },
  { type: 'text', registerName: 'phoneNumber', label: 'Номер телефону' },
  { type: 'email', registerName: 'email', label: 'Ел.пошта' },
  { type: 'password', registerName: 'password', label: 'Пароль' },
  {
    type: 'password',
    registerName: 'confPassword',
    label: 'Підтвердження паролю',
  },
];

const stringValidator = yup.string().required('This field is required!');

export const registrationSchema = yup.object().shape({
  name: stringValidator,
  surname: stringValidator,
  phoneNumber: stringValidator.matches(
    /^[\d-]+$/,
    'Phone number can only contain numbers and dashes ("-")',
  ),
  email: stringValidator
    .email('Invalid email address')
    .typeError('Email must be a valid email address'),
  password: stringValidator.matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  ),
  confPassword: stringValidator.oneOf(
    [yup.ref('password')],
    'Passwords must match',
  ),
});
