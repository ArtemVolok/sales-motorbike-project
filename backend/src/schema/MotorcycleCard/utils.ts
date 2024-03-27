// eslint-disable-next-line import/no-extraneous-dependencies
import { body } from 'express-validator';

export const motorcycleCardValidation = [
  body('name', 'Field name cannot be empty').not().isEmpty(),
  body('price', 'Field price cannot be empty').not().isEmpty(),
  body('vendorCode', 'Field vendorCode cannot be empty').not().isEmpty(),
  body('cubicCapacity', 'Field cubicCapacity cannot be empty').not().isEmpty(),
  body('maxSpeed', 'Field maxSpeed cannot be empty').not().isEmpty(),
  body('numberOfGears', 'Field numberOfGears cannot be empty').not().isEmpty(),
  body('fuelConsumption', 'Field fuelConsumption cannot be empty')
    .not()
    .isEmpty(),
  body('fuelTank', 'Field fuelTank cannot be empty').not().isEmpty(),
  body('weight', 'Field weight cannot be empty').not().isEmpty(),
  body('horsePower', 'Field horsePower cannot be empty').not().isEmpty(),
  // body('password', 'Field password cannot be empty').not().isEmpty(),
  body('typeMotorcycle', 'Field typeMotorcycle cannot be empty')
    .not()
    .isEmpty(),
  body('typeBrakes', 'Field typeBrakes cannot be empty').not().isEmpty(),
  body('fuelInjection', 'Field fuelInjection cannot be empty').not().isEmpty(),
  body('typeCooling', 'Field typeCooling cannot be empty').not().isEmpty(),

  //TODO: should use this validation?
  // body('data.previousPhoto', 'Field previousPhoto cannot be empty')
  //   .not()
  //   .isEmpty(),
];
