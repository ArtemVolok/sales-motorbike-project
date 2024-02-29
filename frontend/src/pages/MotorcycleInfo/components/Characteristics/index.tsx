import { IMotorcycleCard } from '../../../CatalogMotorcycles/types';
import classNames from 'classnames';
import Engine from '../../../../assets/img/engine.png';
import Gear from '../../../../assets/img/gear.png';
import Wheel from '../../../../assets/img/wheel.png';
import Speedometer from '../../../../assets/img/speedometer.png';

import './style.scss';
import '../Description/style.scss';
import { IGeneralInfoTable } from '../Description/utils';

interface ICharacteristicsTables {
  imgComponent: string;
  blockTitle: string;
  tableInfo: IGeneralInfoTable[];
}

const Characteristics = ({ data }: { data?: IMotorcycleCard }) => {
  const {
    horsePower,
    cubicCapacity,
    typeCooling,
    numberOfGears,
    typeBrakes,
    maxSpeed,
    fuelTank,
    fuelConsumption,
    weight,
  } = {
    ...data,
  };

  const characteristicsEngineTable: IGeneralInfoTable[] = [
    { title: 'Тип двигуна', value: 'бензиновий, 4-х тактний' },
    { title: 'Опис циліндрів', value: '1-циліндровий, 2-клапанний' },
    { title: 'Максимальна потужність', value: `${horsePower} [к.с]` },
    { title: 'Об`єм двигуна', value: `${cubicCapacity} [см³]` },
    { title: 'Охолодження двигуна', value: `${typeCooling}` },
  ];

  const characteristicsGearBoxTable: IGeneralInfoTable[] = [
    { title: 'Коробка передач', value: `${numberOfGears} ступінчата` },
  ];

  const characteristicsBrakeTable: IGeneralInfoTable[] = [
    { title: 'Тип гальм', value: `${typeBrakes}` },
  ];

  const characteristicsPerformanceTable: IGeneralInfoTable[] = [
    { title: 'Максимальна швидкість', value: `${maxSpeed} [км/час]` },
    { title: 'Об`єм паливного бака', value: `${fuelTank} [л]` },
    { title: 'Витрати палива', value: `${fuelConsumption} [л/100км]` },
    { title: 'Вага (споряджена)', value: `${weight} [кг]` },
  ];

  const characteristicsTables: ICharacteristicsTables[] = [
    {
      imgComponent: Engine,
      blockTitle: 'Двигун',
      tableInfo: characteristicsEngineTable,
    },
    {
      imgComponent: Gear,
      blockTitle: 'Трансмісія',
      tableInfo: characteristicsGearBoxTable,
    },
    {
      imgComponent: Wheel,
      blockTitle: 'Ходова частина і гальма',
      tableInfo: characteristicsBrakeTable,
    },
    {
      imgComponent: Speedometer,
      blockTitle: 'Експлуатаційні характеристики',
      tableInfo: characteristicsPerformanceTable,
    },
  ];

  return (
    <div className="characteristics">
      {characteristicsTables.map((el) => {
        return (
          <div className="characteristics__block" key={el.blockTitle}>
            <div className="tableTitle">
              <img src={el.imgComponent} className="tableTitle__img" />
              <h3 className="tableTitle__title">{el.blockTitle}</h3>
            </div>
            <table className="tableTab">
              <tbody>
                {el.tableInfo.map((el, index: number) => {
                  return (
                    <tr
                      className={classNames(
                        index % 2 ? 'tableTab-row' : 'tableTab-rowColor',
                      )}
                      key={el.title}
                    >
                      <td className="tableTab-cellTitle">
                        <div className="titleSvgEmpty">{el.icon}</div>
                        {el.title}
                      </td>
                      <td className="tableTab-cellValue">{el.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Characteristics;
