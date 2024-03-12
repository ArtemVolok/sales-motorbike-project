import MailHouse from '../../../../assets/post-build.svg?react';
import TruckFast from '../../../../assets/truck-fast-solid.svg?react';

import './style.scss';

const Advantages = () => {
  return (
    <div className="advantages">
      <div className="delivery">
        <div className="delivery__block">
          <div className="delivery__block-logo">
            <MailHouse className="mailHouseSvg" />
          </div>
          <div className="delivery__block-info">
            <h3 className="info__h">Самовивіз</h3>
            <p className="info__paragraph">з мотосалону м.Дніпро</p>
          </div>
        </div>
        <div className="delivery__block">
          <div className="delivery__block-logo">
            <TruckFast className="truckFastSvg" />
          </div>
          <div className="delivery__block-info">
            <h3 className="info__h">Кур'єром за адресою</h3>
            <p className="info__paragraph">(+300грн до вартості замовлення)</p>
          </div>
        </div>
      </div>
      <div className="reasonBuy">
        <h3 className="reasonBuy__title">Чому купляють у нас?</h3>
        <ul className="reasonBuy__list">
          <li className="reasonBuy__list-li">
            – Без попередньої оплати (накладний платіж)
          </li>
          <li className="reasonBuy__list-li">– Швидка доставка – 2-5 днів</li>
          <li className="reasonBuy__list-li">
            – Самовивіз (мотосалон у Дніпрі)
          </li>
          <li className="reasonBuy__list-li">
            – Якісна упаковка / решетування
          </li>
          <li className="reasonBuy__list-li">
            – Якісне складання та передпродажна підготовка
          </li>
          <li className="reasonBuy__list-li">
            – Надаємо: Сервіс, Гарантію, Документи у МРЕВ
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Advantages;
