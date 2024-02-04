import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/windowWidth';

import bike1 from '../../assets/img/bike1.jpg';
import bike2 from '../../assets/img/bike2.jpg';
import bike3 from '../../assets/img/bike3.jpg';
import helmet from '../../assets/img/helmet.jpg';
import clothes from '../../assets/img/clothes.jpg';
import pump from '../../assets/img/pump.jpg';
import circle from '../../assets/img/circle3.jpg';

import './style.scss';
import { CatalogMotorcyclesUrl } from '../../UrlsConfig';

const Dashboard = () => {
  const windowWidth = useWindowWidth();

  return (
    <div className="main_block">
      <div className="main_logo">
        <div className="main_logo-title">
          <h1 className="main_logo-text">Підкори світ мотокросу</h1>
          <Link to={CatalogMotorcyclesUrl} className="main_logo-button">
            Каталог
          </Link>
        </div>
      </div>
      <div className="main_about">
        <ul className="main_ul">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
            <h3>Готівковий та безготівковий розрахунок</h3>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 640 512"
            >
              <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
            <h3>Доставка по всій Україні</h3>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
            </svg>
            <h3>Повернення протягом 30 днів</h3>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
            </svg>
            <h3>Офіційна гарантія від 1 року</h3>
          </li>
        </ul>
      </div>
      <div className="main_sails">
        <div className="main_sails-top">
          <h2>Бестселери</h2>
          <h4>Переглянути всі &#187;</h4>
        </div>
      </div>
      <div className="main_cards">
        <ul>
          <li>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg> */}
          </li>
          {windowWidth > 820 ? (
            <>
              <li className="main-cards-el">
                <img src={bike1} alt="" />
                <p>Артикул: 1325</p>
                <h3>Мотоцикл VOGE 300DS (Loncin LX300-6D DS6)</h3>
                <h4>56 234 грн</h4>
                <div className="buy">Купити</div>
                <p>Кубатура 292 [см³], Макс.скорость 130 [км/час], Инжектор</p>
              </li>
              <li className="main-cards-el">
                <img src={bike2} alt="" />
                <p>Артикул: 1475</p>
                <h3>Мотоцикл SHINERAY XY250-6C CROSS</h3>
                <h4>67 995 грн</h4>
                <div className="buy">Купити</div>
                <p>
                  Кубатура 242 [см³], Макс.скорость 120 [км/час], Карбюратор
                </p>
              </li>
              <li className="main-cards-el">
                <img src={bike3} alt="" />
                <p>Артикул: 2714</p>
                <h3>Мотоцикл FORTE FT300-CFB</h3>
                <h4>84 395 грн</h4>
                <div className="buy">Купити</div>
                <p>Кубатура 300 [см³], Макс.скорость 140 [км/час], Інжектор</p>
              </li>
            </>
          ) : windowWidth >= 560 ? (
            <>
              <li className="main-cards-el">
                <img src={bike1} alt="" />
                <p>Артикул: 1325</p>
                <h3>Мотоцикл VOGE 300DS (Loncin LX300-6D DS6)</h3>
                <h4>56 234 грн</h4>
                <div className="buy">Купити</div>
                <p>Кубатура 292 [см³], Макс.скорость 130 [км/час], Инжектор</p>
              </li>
              <li className="main-cards-el">
                <img src={bike2} alt="" />
                <p>Артикул: 1475</p>
                <h3>Мотоцикл SHINERAY XY250-6C CROSS</h3>
                <h4>67 995 грн</h4>
                <div className="buy">Купити</div>
                <p>
                  Кубатура 242 [см³], Макс.скорость 120 [км/час], Карбюратор
                </p>
              </li>
            </>
          ) : (
            <li className="main-cards-el">
              <img src={bike1} alt="" />
              <p>Артикул: 1325</p>
              <h3>Мотоцикл VOGE 300DS (Loncin LX300-6D DS6)</h3>
              <h4>56 234 грн</h4>
              <div className="buy">Купити</div>
              <p>Кубатура 292 [см³], Макс.скорость 130 [км/час], Инжектор</p>
            </li>
          )}

          <li>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg> */}
          </li>
        </ul>
      </div>
      <div className="main_about2">
        <div className="main_about2-left">
          <h3>//</h3>
          <p>
            Магазин "EnduroEngine" - це місце, де страсть до пригод і бажання
            подолати найважчі бездоріжжя стають реальністю.{' '}
          </p>
          <p>
            Заснований у 2012 році в місті Дніпро, ми стали піонерами у світі
            ендуро мотоциклів у нашому регіоні.
          </p>
          <p>
            У "EnduroEngine" ви знайдете найкращі мотоцикли, які готові вивести
            вас на будь-яку подорож, незалежно від умов.{' '}
          </p>
          <p>
            Наша команда - це ентузіасти, які самі тестують і використовують
            наші товари, тому ми завжди готові надати поради та ділитися
            досвідом.
          </p>
        </div>
      </div>
      <div className="main_sails">
        <div className="main_sails-top">
          <h2>Купують разом</h2>
          <h4>Переглянути всі &#187;</h4>
        </div>
      </div>
      <div className="main_extras">
        <ul>
          {windowWidth > 820 ? (
            <>
              <li>
                <img src={helmet} alt="" />
                <p>Шоломи</p>
              </li>
              <li>
                <img src={clothes} alt="" />
                <p>Екіпіровка</p>
              </li>
              <li>
                <img src={pump} alt="" />
                <p>Спорядження</p>
              </li>
              <li>
                <img src={circle} alt="" />
                <p>Колеса</p>
              </li>
            </>
          ) : windowWidth >= 560 ? (
            <>
              <li>
                <img src={helmet} alt="" />
                <p>Шоломи</p>
              </li>
              <li>
                <img src={clothes} alt="" />
                <p>Екіпіровка</p>
              </li>
              <li>
                <img src={pump} alt="" />
                <p>Спорядження</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <img src={helmet} alt="" />
                <p>Шоломи</p>
              </li>
              <li>
                <img src={clothes} alt="" />
                <p>Екіпіровка</p>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
