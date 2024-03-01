import * as yup from 'yup';

const stringValidator = yup.string().required('This field is required!');

export const loginSchema = yup.object().shape({
  email: stringValidator,
  password: stringValidator,
});
