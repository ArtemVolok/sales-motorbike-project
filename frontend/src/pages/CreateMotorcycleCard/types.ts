import { IMotorcycleCard } from '../CatalogMotorcycles/types';

export interface ISuccessCreateMotorcycleCard {
  message: string;
  response: IMotorcycleCard;
}
