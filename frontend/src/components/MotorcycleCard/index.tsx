import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { IMotorcycleCard } from '../../pages/CatalogMotorcycles/types';
import { API_V1_URL } from '../../constants';
import { MotorcycleInfoUrl } from '../../UrlsConfig';

import './style.scss';

const MotorcycleCard = ({
  motorcycleData,
}: {
  motorcycleData: IMotorcycleCard;
}) => {
  const navigate = useNavigate();

  const {
    name,
    vendorCode,
    availableColors,
    typeBrakes,
    cubicCapacity,
    fuelInjection,
    maxSpeed,
    numberOfGears,
    price,
    typeCooling,
    typeMotorcycle,
    uploadImage,
    _id,
  } = motorcycleData;

  return (
    <>
      <div className="cardItem">
        {!!uploadImage && uploadImage.filename ? (
          <img
            className="cardItem__photo"
            src={`${API_V1_URL}/images/${uploadImage.filename}`}
            alt="bike1"
          />
        ) : (
          <div className="cardItem__missingPhoto">
            <p> Фото тимчасово недоступне</p>
          </div>
        )}
        <p className="cardItem__vendorCode">Артикул: {vendorCode}</p>
        <h3 className="cardItem__name">
          {typeMotorcycle}: {name}
        </h3>
        <h2 className="cardItem__price">{price} грн</h2>
        {/* TODO: fix onClick in button */}
        <div className="cardItem__buyBlock">
          <button
            onClick={() => navigate(`/${MotorcycleInfoUrl}/${_id}`)}
            className="buyBlock__button"
          >
            Купити
          </button>
        </div>
        <div className="cardItemHover">
          <div className="cardItemHover__colorBlock">
            <p className="cardItemHover__colorBlock-title">Наявні кольори:</p>
            <div className="cardItemHover__colorBlock-colors">
              {availableColors.map((el: string, index: number) => {
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
                <li>{typeBrakes}</li>
                <li>{fuelInjection}</li>
                <li>{typeCooling}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MotorcycleCard;
