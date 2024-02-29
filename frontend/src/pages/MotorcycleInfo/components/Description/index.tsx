import { IMotorcycleCard } from '../../../CatalogMotorcycles/types';
import { generalInfoTable } from './utils';

import './style.scss';
import classNames from 'classnames';

const Description = ({ data }: { data?: IMotorcycleCard }) => {
  const { cubicCapacity, horsePower, name, fuelInjection, fuelTank } = {
    ...data,
  };

  return (
    <div className="description">
      <div className="description__engine">
        <h3 className="description__engine-title">{name}</h3>
        <h3 className="description__engine-title">Характеристики двигуна:</h3>
        <p className="description__engine-paragraph">
          бензиновый, 4-х тактный, 1-цилиндровый, 2-клапанный, с интегрированным
          балансировочным валом и оснащенный цепным приводом распределительного
          вала, объемом <strong> {cubicCapacity} куб.см </strong> мощностью{' '}
          <strong> {horsePower} к.с. </strong>. Эффективное воздушное охлаждение
          и балансировочный вал для снижения вибраций на больших оборотах.
        </p>
        <ul className="description__engine-paragraph">
          <li>
            1. <strong>{fuelInjection}</strong> система подачі топлива
          </li>
          <li>
            2. Максимальна потужність - <strong> {horsePower} к.с</strong>
          </li>
          <li>
            3. Об'єм топливного баку - <strong>{fuelTank} л.</strong>
          </li>
        </ul>
      </div>
      <div className="description__info">
        <table className="tableTab">
          <tbody>
            {generalInfoTable.map((el, index) => {
              return (
                <tr
                  className={classNames(
                    index % 2 ? 'tableTab-row' : 'tableTab-rowColor',
                  )}
                  key={el.title}
                >
                  <td className="tableTab-cellTitle">
                    <div className="titleSvg">{el.icon}</div>
                    {el.title}
                  </td>
                  <td className="tableTab-cellValue">{el.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Description;
