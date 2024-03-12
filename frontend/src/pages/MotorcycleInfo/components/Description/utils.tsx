import React from 'react';
import Award from '../../../../assets/award-solid.svg?react';
import Truck from '../../../../assets/truck-solid.svg?react';
import Key from '../../../../assets/key-solid.svg?react';
import Oil from '../../../../assets/oil-can-solid.svg?react';
import Industry from '../../../../assets/industry-solid.svg?react';
import Gear from '../../../../assets/gear-solid.svg?react';

export interface IGeneralInfoTable {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export const generalInfoTable: IGeneralInfoTable[] = [
  { title: 'Гарантія', value: '12 місяців', icon: <Award /> },
  { title: 'Вантажопідйомність', value: '90 кг', icon: <Truck /> },
  {
    title: 'Система запалювання',
    value: 'електронне (CDI)',
    icon: <Key />,
  },
  {
    title: 'Система змазки',
    value: 'тиском та розбризкуванням, з мокрим картером',
    icon: <Oil />,
  },
  {
    title: 'Масло, що рекомендується',
    value:
      'масло SAE 10W-40 або 15W-50 не нижче SE. Напівсинтетика для мотоциклетних двигунів (залежно від сезону).',
    icon: <Gear />,
  },
  {
    title: 'Країна виробник',
    value: 'Китай',
    icon: <Industry />,
  },
];
