import { Link } from 'react-router-dom';
import { DashboardUrl } from '../../UrlsConfig';
import './style.scss';
import { useForm } from 'react-hook-form';

interface IFeedbackForm {
  gender: string;
  age: number;
  musicInfluence: number;
  totalImpression: number;
  generalAppearance: number;
  designAppeal: number;
  colorPalette: number;
  fontCompatibility: number;
  searchInfo: number;
  organizationNavigation: number;
  usabilityAdaptive: number;
  useOnMobile: number;
  experienceWithMusic: number;
  timeWithMusic: number;
  expressionWithMusic: number;
}

const arrGrade: number[] = [1, 2, 3, 4, 5];

const Feedback = () => {
  const { handleSubmit, register } = useForm<IFeedbackForm>({
    mode: 'onChange',
    defaultValues: {},
  });

  const onSubmit = (data: IFeedbackForm) => {
    console.log('data on submit', data);
  };

  return (
    <>
      <div className="container">
        <h2>Поділіться вашим враженням! Ваш відгук важливий для нас.</h2>
        <h3>
          Ми запрошуємо вас взяти участь у опитуванні щодо якості дизайну сайту.
          Ми цінуємо ваш час і зусилля, витрачені на надання нам вашої думки.
        </h3>

        <div className="infoBlock">
          <h4>
            Будь ласка, уважно прочитайте кожне твердження. Використовуючи шкалу
            від 1 до 5, дайте відповідь.
          </h4>
          <ul>
            <li>1 - дуже погано</li>
            <li>2 - погано</li>
            <li>3 - задовільно</li>
            <li>4 - добре</li>
            <li>5 - дуже добре</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="genderSection">
            <h4>Вкажіть вашу стать:</h4>
            <div className="genderSection__choiceBlock">
              <label htmlFor="maleGender">
                Чоловіча
                <input
                  {...register('gender')}
                  type="radio"
                  value="male"
                  id="maleGender"
                />
                <span className="checkMark"></span>
              </label>
              <label htmlFor="femaleGender">
                Жіноча
                <input
                  {...register('gender')}
                  type="radio"
                  value="female"
                  id="femaleGender"
                />
                <span className="checkMark"></span>
              </label>
              <label htmlFor="otherGender">
                Інша
                <input
                  {...register('gender')}
                  type="radio"
                  value="other"
                  id="otherGender"
                />
                <span className="checkMark"></span>
              </label>
            </div>
          </div>
          <div className="ageSection">
            <h4>Вкажіть ваш вік:</h4>
            <div>
              <input
                type="number"
                {...register('age')}
                id="age"
                className="ageSection__input"
              />
            </div>
          </div>
          <div className="musicInfluence">
            <h4>
              Чи вплинула фонова музика на вашу загальну атмосферу під час
              перегляду сайту?
            </h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`musicInfluence${el}`}
                    key={`musicInfluence${el}`}
                  >
                    <p>{el}</p>
                    <input
                      {...register('musicInfluence')}
                      type="radio"
                      value={el}
                      id={`musicInfluence${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="totalImpression">
            <h4>
              Як ви оцінюєте загальний враження від візуального та аудіо
              дизайну?
            </h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`totalImpression${el}`}
                    key={`totalImpression${el}`}
                  >
                    {el}
                    <input
                      {...register('totalImpression')}
                      type="radio"
                      value={el}
                      id={`totalImpression${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="generalAppearance">
            <h4>Оцініть загальний зовнішній вигляд веб-додатку</h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`generalAppearance${el}`}
                    key={`generalAppearance${el}`}
                  >
                    {el}
                    <input
                      {...register('generalAppearance')}
                      type="radio"
                      value={el}
                      id={`generalAppearance${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="designAppeal">
            <h4>Як ви оцінюєте привабливість та сучасність дизайну сайту?</h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`designAppeal${el}`}
                    key={`designAppeal${el}`}
                  >
                    {el}
                    <input
                      {...register('designAppeal')}
                      type="radio"
                      value={el}
                      id={`designAppeal${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="colorPalette">
            <h4>
              Чи добре ви сприймаєте колірну палітру та засоби візуальної
              ідентифікації сайту?
            </h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`colorPalette${el}`}
                    key={`colorPalette${el}`}
                  >
                    {el}
                    <input
                      {...register('colorPalette')}
                      type="radio"
                      value={el}
                      id={`colorPalette${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="fontCompatibility">
            <h4>
              Як ви оцінюєте відповідність шрифту і кольорової гами в дизайні до
              тематики сайту?
            </h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`fontCompatibility${el}`}
                    key={`fontCompatibility${el}`}
                  >
                    {el}
                    <input
                      {...register('fontCompatibility')}
                      type="radio"
                      value={el}
                      id={`fontCompatibility${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="searchInfo">
            <h4>Чи легко ви знаходите потрібну інформацію на сайті?</h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label htmlFor={`searchInfo${el}`} key={`searchInfo${el}`}>
                    {el}
                    <input
                      {...register('searchInfo')}
                      type="radio"
                      value={el}
                      id={`searchInfo${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="organizationNavigation">
            <h4>Чи задоволені ви організацією навігації на сайті?</h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`organizationNavigation${el}`}
                    key={`organizationNavigation${el}`}
                  >
                    {el}
                    <input
                      {...register('organizationNavigation')}
                      type="radio"
                      value={el}
                      id={`organizationNavigation${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="usabilityAdaptive">
            <h4>
              Як ви вважаєте, чи полегшує адаптивний дизайн сайту вам процес
              вибору та порівняння мотоциклів на різних пристроях?
            </h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`usabilityAdaptive${el}`}
                    key={`usabilityAdaptive${el}`}
                  >
                    {el}
                    <input
                      {...register('usabilityAdaptive')}
                      type="radio"
                      value={el}
                      id={`usabilityAdaptive${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="useOnMobile">
            <h4>
              Як ви оцінюєте зручність використання сайту на мобільних
              пристроях?
            </h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label htmlFor={`useOnMobile${el}`} key={`useOnMobile${el}`}>
                    {el}
                    <input
                      {...register('useOnMobile')}
                      type="radio"
                      value={el}
                      id={`useOnMobile${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="experienceWithMusic">
            <h4>
              Чи вважаєте ви, що фонова музика покращує загальний
              користувальницький досвід на сайті?
            </h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`experienceWithMusic${el}`}
                    key={`experienceWithMusic${el}`}
                  >
                    {el}
                    <input
                      {...register('experienceWithMusic')}
                      type="radio"
                      value={el}
                      id={`experienceWithMusic${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="timeWithMusic">
            <h4>Чи вплинула музика на вашу тривалість перебування на сайті?</h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`timeWithMusic${el}`}
                    key={`timeWithMusic${el}`}
                  >
                    {el}
                    <input
                      {...register('timeWithMusic')}
                      type="radio"
                      value={el}
                      id={`timeWithMusic${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="expressionWithMusic">
            <h4>Оцініть вплив сайту на ваше враження про продукт</h4>
            <div>
              {arrGrade.map((el: number) => {
                return (
                  <label
                    htmlFor={`expressionWithMusic${el}`}
                    key={`expressionWithMusic${el}`}
                  >
                    {el}
                    <input
                      {...register('expressionWithMusic')}
                      type="radio"
                      value={el}
                      id={`expressionWithMusic${el}`}
                    />
                    <span className="checkMark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="submitSector">
            <Link to={DashboardUrl} className="submitSector__link">
              На головну
            </Link>
            <button type="submit" className="submitSector__submit">
              Відправити
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Feedback;
