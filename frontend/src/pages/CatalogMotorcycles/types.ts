import { INewMotorcycleCard } from '../../components/FormMotorcycleCard/types';

export interface IMotorcycleCard
  extends Omit<INewMotorcycleCard, 'uploadImage'> {
  uploadImage: {
    path: string;
    filename: string;
    originalname: string;
    size: number;
  };
  __v: number;
  _id: string;
}

// export interface IError {
//   errorCode: number;
//   errorMessage: string;
// }
