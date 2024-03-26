import { INewMotorcycleCard } from '../../components/FormMotorcycleCard/types';

export interface IUpdateMotorcycleCard
  extends Omit<INewMotorcycleCard, 'uploadImage'> {}
