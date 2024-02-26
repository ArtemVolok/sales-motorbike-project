export interface IMotorcycleCardAdmin {
  _id: string;
  name: string;
  vendorCode: string;
  price: number;
  handleDeleteMotorcycleCard: (_id: string) => void;
}

export interface ISuccessDeleteMotorcycleResponse {
  message: string;
}
