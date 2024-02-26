import { IError } from '../../pages/CatalogMotorcycles/types';

export interface IMotorcycleCardAdmin {
  _id: string;
  name: string;
  vendorCode: string;
  price: number;
  refetch: () => void;
  setDeleteMotorcycleResponse: (
    data: ISuccessDeleteMotorcycleResponse | IError,
  ) => void;
}

export interface ISuccessDeleteMotorcycleResponse {
  message: string;
}
