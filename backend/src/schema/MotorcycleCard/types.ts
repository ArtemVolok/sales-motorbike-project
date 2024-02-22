export const ETypeInput = {
  STRING: 'string',
  NUMBER: 'number',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
};

export const ETypeMotorcycle = {
  MOTORCYCLE: 'motorcycle',
  PITBIKE: 'pitbike',
  SCOOTER: 'scooter',
  MOPED: 'moped',
  QUADBIKE: 'quadBike',
};

export const ETypeCooling = {
  AIR: 'air',
  LIQUID: 'liquid',
};

export const ETypeBrakes = {
  DISC: 'disc',
  DRUM: 'drum',
};

export const EFuelInjection = {
  INJECTOR: 'injector',
  CARBURETOR: 'carburetor',
};

export interface ITypeBrakes {
  type: string;
  name: string;
}

export interface IFuelInjection {
  type: string;
  name: string;
}

export interface ITypeMotorcycle {
  type: string;
  name: string;
}

export interface ITypeCooling {
  type: string;
  name: string;
}

export interface IMotorcycleCard {
  uploadImage: {
    path: string;
    filename: string;
    originalname: string;
    size: number;
  };
  name: string;
  price: number;
  typeMotorcycle: string;
  typeBrakes: string;
  fuelInjection: string;
  typeCooling: string;
  vendorCode: string;
  availableColors: string[];
  cubicCapacity: number;
  maxSpeed: number;
  numberOfGears: number;
  fuelConsumption: number;
  fuelTank: number;
  weight: number;
  horsePower: number;
  password: string;
}
