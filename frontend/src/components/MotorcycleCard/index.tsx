import classNames from 'classnames';
import './style.scss';

import BuyButton from '../BuyButton';

export interface IMotorcycleData {
  name: string;
  price: number;
  vendorCode: string;
  availableColor: string[];
  cubicCapacity: number;
  maxSpeed: number;
  numberOfGears: number;
  brakes: string;
  fuelInjection: string;
  cooling: string;
}

const MotorcycleCard = ({
  motorcycleData,
}: {
  motorcycleData: IMotorcycleData;
}) => {
  const {
    name,
    vendorCode,
    availableColor,
    brakes,
    cooling,
    cubicCapacity,
    fuelInjection,
    maxSpeed,
    numberOfGears,
    price,
  } = motorcycleData;
  console.log('name', name);
  return (
    <>
      <div className="cardItem">
        {/* TODO: solve problem with photo dot bike */}
        <img
          className="cardItem__photo"
          src="../../assets/img/bike1.png"
          alt="bike1"
        />
        <p className="cardItem__vendorCode">Артикул: {vendorCode}</p>
        <h3 className="cardItem__name">Мотоцикл: {name}</h3>
        <h2 className="cardItem__price">{price} грн</h2>
        <div className="cardItem__buyBlock">
          <BuyButton path={''} />
        </div>
        <div className="cardItemHover">
          <div className="cardItemHover__colorBlock">
            <p className="cardItemHover__colorBlock-title">Наявні кольори:</p>
            <div className="cardItemHover__colorBlock-colors">
              {availableColor.map((el: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="cardItemHover__colorBlock-externalColor"
                  >
                    <div
                      className={classNames(
                        'cardItemHover__colorBlock-color',
                        `${el}-background`,
                      )}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="cardItemHover__describeList">
            <div className="cardItemHover__describeList-title">
              <ul>
                <li>Кубатура:</li>
                <li>Макс.швидкість:</li>
                <li>Коробка:</li>
                <li>Гальма:</li>
                <li>Вприск палива:</li>
                <li>Охолодження:</li>
              </ul>
            </div>
            <div className="cardItemHover__describeList-value">
              <ul>
                <li>{cubicCapacity} [см³]</li>
                <li>{maxSpeed} [км/г.]</li>
                <li>{numberOfGears}</li>
                <li>{brakes}</li>
                <li>{fuelInjection}</li>
                <li>{cooling}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MotorcycleCard;
