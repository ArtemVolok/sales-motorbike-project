import { INewMotorcycleCard } from '../CreateMotorcycleCart/types';

export interface IMotorcycleCard
  extends Omit<INewMotorcycleCard, 'uploadImage'> {
  uploadImage: {
    path: string;
    filename: string;
    originalname: string;
    size: number;
  };
}

export interface IError {
  errorCode: number;
  message: string;
}
