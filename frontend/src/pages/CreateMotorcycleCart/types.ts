export enum ETypeInput {
  STRING = 'string',
  NUMBER = 'number',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
}

export enum ETypeMotorcycle {
  MOTORCYCLE = 'motorcycle',
  PITBIKE = 'pitbike',
  SCOOTER = 'scooter',
  MOPED = 'moped',
  QUADBIKE = 'quadBike',
}

export enum ETypeCooling {
  AIR = 'air',
  LIQUID = 'liquid',
}

export enum ETypeBrakes {
  DISC = 'disc',
  DRUM = 'drum',
}

export enum EFuelInjection {
  INJECTOR = 'injector',
  CARBURETOR = 'carburetor',
}

// export enum EAvailableColor {
//   RED = 'red',
//   BLUE = 'blue',
//   ORANGE = 'orange',
//   GREEN = 'green',
//   BLACK = 'black',
//   WHITE = 'white',
// }

//TODO:
export const listColors = [
  'red',
  'blue',
  'orange',
  'green',
  'black',
  'white',
  'yellow',
];

export interface ITypeBrakes {
  type: ETypeBrakes;
  name: string;
}

export interface IFuelInjection {
  type: EFuelInjection;
  name: string;
}

export interface ITypeMotorcycle {
  type: ETypeMotorcycle;
  name: string;
}

export interface ITypeCooling {
  type: ETypeCooling;
  name: string;
}

export interface INewMotorcycleCard {
  name: string;
  price: number | null;
  typeMotorcycle: ETypeMotorcycle;
  typeBrakes: ETypeBrakes;
  fuelInjection: EFuelInjection;
  typeCooling: ETypeCooling;
  vendorCode: string;
  availableColors: string[];
  cubicCapacity: number | null;
  maxSpeed: number | null;
  numberOfGears: number | null;
  fuelConsumption: number | null;
  fuelTank: number | null;
  weight: number | null;
  horsePower: number | null;
  password: string;
}

export interface IListItem {
  registerName: string;
  label: string;
}

export interface IListInput extends IListItem {
  type: ETypeInput.NUMBER | ETypeInput.STRING;
}

export interface IListSelect extends IListItem {
  data: ITypeMotorcycle[] | IFuelInjection[] | ITypeBrakes[] | ITypeCooling[];
  type: ETypeInput.SELECT;
}

export interface IListCheckbox extends IListItem {
  data: string[];
  type: ETypeInput.CHECKBOX;
}

export const defaultValueMotorcycleCard: INewMotorcycleCard = {
  name: '',
  price: null,
  vendorCode: '',
  cubicCapacity: null,
  maxSpeed: null,
  numberOfGears: null,
  fuelConsumption: null,
  fuelTank: null,
  weight: null,
  horsePower: null,
  typeMotorcycle: ETypeMotorcycle.MOTORCYCLE,
  typeBrakes: ETypeBrakes.DISC,
  fuelInjection: EFuelInjection.CARBURETOR,
  typeCooling: ETypeCooling.AIR,
  availableColors: [],
  password: '',
};

export const typeMotorcycle: ITypeMotorcycle[] = [
  { type: ETypeMotorcycle.MOPED, name: 'Мопед' },
  { type: ETypeMotorcycle.MOTORCYCLE, name: 'Мотоцикл' },
  {
    type: ETypeMotorcycle.PITBIKE,
    name: 'Пітбак',
  },
  { type: ETypeMotorcycle.QUADBIKE, name: 'Квадроцикл' },
  { type: ETypeMotorcycle.SCOOTER, name: 'Скутер' },
];

export const typeFuelInjection: IFuelInjection[] = [
  { type: EFuelInjection.CARBURETOR, name: 'Карбюратор' },
  { type: EFuelInjection.INJECTOR, name: 'Інжектор' },
];

export const typeBrakes: ITypeBrakes[] = [
  { type: ETypeBrakes.DISC, name: 'Дискові' },
  { type: ETypeBrakes.DRUM, name: 'Барабанні' },
];

export const typeCooling: ITypeCooling[] = [
  { type: ETypeCooling.AIR, name: 'Повітряна' },
  { type: ETypeCooling.LIQUID, name: 'Рідка' },
];

// export const availableColors = [
//   EAvailableColor.BLACK,
//   EAvailableColor.BLUE,
//   EAvailableColor.GREEN,
//   EAvailableColor.ORANGE,
//   EAvailableColor.RED,
//   EAvailableColor.WHITE,
// ];

export const listInputs: (IListInput | IListSelect | IListCheckbox)[] = [
  {
    registerName: 'password',
    label: 'Пароль:',
    type: ETypeInput.STRING,
  },
  {
    registerName: 'name',
    label: 'Назва мотоциклу:',
    type: ETypeInput.STRING,
  },
  {
    registerName: 'price',
    label: 'Ціна мотоциклу:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'vendorCode',
    label: 'Артикул товару:',
    type: ETypeInput.STRING,
  },
  {
    registerName: 'cubicCapacity',
    label: 'Об`єм двигуна:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'horsePower',
    label: 'Потужність двигуна:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'maxSpeed',
    label: 'Максимальна швидкість:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'numberOfGears',
    label: 'Кількість передач:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'fuelConsumption',
    label: 'Витрата палива:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'fuelTank',
    label: 'Об`єм топливного баку:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'weight',
    label: 'Вага мотоциклу:',
    type: ETypeInput.NUMBER,
  },
  {
    registerName: 'typeMotorcycle',
    label: 'Тип мотоциклу:',
    type: ETypeInput.SELECT,
    data: typeMotorcycle,
  },
  {
    registerName: 'fuelInjection',
    label: 'Тип подачі палива:',
    type: ETypeInput.SELECT,
    data: typeFuelInjection,
  },
  {
    registerName: 'typeBrakes',
    label: 'Тип гальмівної системи:',
    type: ETypeInput.SELECT,
    data: typeBrakes,
  },
  {
    registerName: 'typeCooling',
    label: 'Тип охолоджувальної системи:',
    type: ETypeInput.SELECT,
    data: typeCooling,
  },
  {
    registerName: 'availableColors',
    label: 'Доступні кольори',
    type: ETypeInput.CHECKBOX,
    data: listColors,
  },
];
