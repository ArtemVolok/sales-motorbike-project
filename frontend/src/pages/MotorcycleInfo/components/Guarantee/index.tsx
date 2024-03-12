import ShieldSvg from '../../../../assets/shield.svg?react';
import PaperInfo from '../../../../assets/paper-list.svg?react';
import WarningTriangle from '../../../../assets/mark-triangle.svg?react';

import './style.scss';

const Guarantee = () => {
  return (
    <div className="guarantee">
      <div className="guarantee__block">
        <div>
          <ShieldSvg className="guarantee__svg greenSvg" />
        </div>
        <div>
          <p>
            Ми є офіційним дилером в Україні всієї представленої техніки та
            &nbsp;
            <strong>
              надаємо офіційну гарантію від 12 до 36 місяців.
            </strong>{' '}
            прописану у договорі купівлі-продажу.
          </p>
          <p>Обмен/возврат товара в течение 14 дней.</p>
        </div>
      </div>
      <div className="guarantee__block">
        <div>
          <PaperInfo className="guarantee__svg blueSvg" />
        </div>
        <div>
          <h3 className="guarantee__block-title">
            Зробимо всі документи для встановлення транспорту на облік:
          </h3>
          <p>
            Договір купівлі-продажу, акт приймання-передачі, акт технічного
            огляду, вантажна митна декларація, сертифікат відповідності,
            транзитний номер.
          </p>
        </div>
      </div>
      <div className="guarantee__block">
        <div>
          <WarningTriangle className="guarantee__svg redSvg" />
        </div>
        <p>
          Деякі моделі красових мотоциклів, пітбайків та квадроцькілів – не
          передбачені для доріг громадського користування, уточнюйте інформацію
          щодо конкретної моделі – по телефону.
        </p>
      </div>
    </div>
  );
};

export default Guarantee;
