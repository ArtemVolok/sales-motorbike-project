// eslint-disable-next-line import/no-extraneous-dependencies
import { body } from 'express-validator';

export const profileUserValidation = [
  body('name', 'Field name cannot be empty').not().isEmpty(),
  body('surname', 'Field surname cannot be empty').not().isEmpty(),
  body('phoneNumber', 'Field phoneNumber cannot be empty').not().isEmpty(),
  body('email', 'Field mail cannot be empty').not().isEmpty(),
  body('password', 'Field password cannot be empty').not().isEmpty(),
];
