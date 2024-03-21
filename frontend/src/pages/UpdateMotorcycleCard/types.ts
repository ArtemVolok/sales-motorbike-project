import { INewMotorcycleCard } from '../../components/FormCreateMotorcycleCard/types';

export interface IUpdateMotorcycleCard
  extends Omit<INewMotorcycleCard, 'uploadImage'> {}
