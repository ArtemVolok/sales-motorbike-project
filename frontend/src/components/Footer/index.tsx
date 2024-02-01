import './style.scss';

const Footer = () => {
  return (
    <div className="footer_block">
      <div className="footer_about">
        <h3 className="footer_ul-title">EnduroEngine</h3>
        <div className="footer_info">
          <ul className="footer_ul">
            <li>Про нас</li>
            <li>Співпраця</li>
            <li>Гарантія</li>
            <li>Оплата та доставка</li>
          </ul>
          <ul className="footer_ul">
            <li>Контакти:</li>
            <li>+38-093-77-81-527</li>
            <li>artiom.volok@gmail.com</li>
          </ul>
        </div>
        <p className="footer_inc">ENDUROENGINE &#169;. Всі права захищено.</p>
      </div>
      <div className="footer_form">
        <h3 className="footer_form-h3">Залишились запитання?</h3>
        <h4 className="footer_form-h4">
          Залиште ваші данні, ми вам зателефонуємо через 10 хвилин
        </h4>
        <div className="footer_form-inputs">
          <input type="text" placeholder="Ім'я" className="footer_form-input" />
          <input
            type="text"
            placeholder="Номер телефону"
            className="footer_form-input"
          />
          <div className="footer_form-checkbox">
            <input type="checkbox" />
            <label>Згоден на обробку персональних данних*</label>
          </div>
          <button className="footer_form-button">Залишити</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
