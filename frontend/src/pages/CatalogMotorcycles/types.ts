import { IMotorcycleData } from '../../components/MotorcycleCard';

export interface IMotorcycleCard {
  name: string;
  price: number;
  vendorCode: string;
  description: string;
}

export interface IError {
  errorCode: number;
  message: string;
}

export const motorcycleData: IMotorcycleData[] = [
  {
    name: 'LONCIN LX200GY-3 PRUSS',
    price: 61760,
    vendorCode: 'MOT-225',
    availableColor: ['red', 'black', 'yellow', 'green'],
    cubicCapacity: 150,
    maxSpeed: 115,
    numberOfGears: 5,
    brakes: 'Дискові/Барабанні',
    fuelInjection: 'Карбюратор',
    cooling: 'Повітряне',
  },
  {
    name: 'LONCIN LX200GY-3 PRUSS',
    price: 61760,
    vendorCode: 'MOT-225',
    availableColor: ['red', 'black', 'yellow', 'green'],
    cubicCapacity: 150,
    maxSpeed: 115,
    numberOfGears: 5,
    brakes: 'Дискові/Барабанні',
    fuelInjection: 'Карбюратор',
    cooling: 'Повітряне',
  },
  {
    name: 'LONCIN LX200GY-3 PRUSS',
    price: 61760,
    vendorCode: 'MOT-225',
    availableColor: ['red', 'black', 'yellow', 'green'],
    cubicCapacity: 150,
    maxSpeed: 115,
    numberOfGears: 5,
    brakes: 'Дискові/Барабанні',
    fuelInjection: 'Карбюратор',
    cooling: 'Повітряне',
  },
];
