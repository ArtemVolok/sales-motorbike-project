// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import {
  EFuelInjection,
  ETypeBrakes,
  ETypeCooling,
  ETypeMotorcycle,
} from './types';

const MotorcycleCardItem = new mongoose.Schema({
  name: String,
  price: Number,
  vendorCode: String,
  cubicCapacity: Number,
  maxSpeed: Number,
  numberOfGears: Number,
  fuelConsumption: Number,
  fuelTank: Number,
  weight: Number,
  horsePower: Number,
  password: String,
  typeMotorcycle: {
    type: String,
    enum: Object.values(ETypeMotorcycle),
  },
  typeBrakes: {
    type: String,
    enum: Object.values(ETypeBrakes),
  },
  fuelInjection: {
    type: String,
    enum: Object.values(EFuelInjection),
  },
  typeCooling: {
    type: String,
    enum: Object.values(ETypeCooling),
  },
  availableColors: [String],
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
