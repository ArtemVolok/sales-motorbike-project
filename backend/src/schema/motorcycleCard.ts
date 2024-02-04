// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

const MotorcycleCardItem = new mongoose.Schema({
  name: String,
  price: Number,
  vendorCode: String,
  description: String,
});

export const MotorcycleCardModel = mongoose.model(
  'motorcycleCard',
  MotorcycleCardItem,
);

export interface IMotorcycleCard {
  name: string;
  price: number;
  vendorCode: string;
  description: string;
}
