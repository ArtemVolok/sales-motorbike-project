// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import {
  EFuelInjection,
  ETypeBrakes,
  ETypeCooling,
  ETypeMotorcycle,
} from './types';

const MotorcycleCardItem = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  vendorCode: { type: String, required: true },
  cubicCapacity: { type: Number, required: true },
  maxSpeed: { type: Number, required: true },
  numberOfGears: { type: Number, required: true },
  fuelConsumption: { type: Number, required: true },
  fuelTank: { type: Number, required: true },
  weight: { type: Number, required: true },
  horsePower: { type: Number, required: true },
  // password: { type: String, required: true },
  typeMotorcycle: {
    type: String,
    enum: Object.values(ETypeMotorcycle),
    required: true,
  },
  typeBrakes: {
    type: String,
    enum: Object.values(ETypeBrakes),
    required: true,
  },
  fuelInjection: {
    type: String,
    enum: Object.values(EFuelInjection),
    required: true,
  },
  typeCooling: {
    type: String,
    enum: Object.values(ETypeCooling),
    required: true,
  },
  availableColors: [{ type: String, required: true }],
  uploadImage: {
    path: { type: String, required: true },
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    size: { type: Number, required: true },
  },
});

export const MotorcycleCardModel = mongoose.model(
  'motorcycleCard',
  MotorcycleCardItem,
);
