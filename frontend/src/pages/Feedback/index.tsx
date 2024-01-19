import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DashboardUrl } from '../../UrlsConfig';
import { IFeedbackForm, IQuestion, arrGrade, listQuestion } from './types';
import './style.scss';

const Feedback = () => {
  const { handleSubmit, register } = useForm<IFeedbackForm>({
    mode: 'onChange',
    defaultValues: {},
  });

  const onSubmit = (data: IFeedbackForm) => {
    console.log('data on submit', data);
  };

  return (
    <div className="wrapper">
      <div className="container feedbackPage">
        <h2 className="feedbackPage__h2">
          Поділіться вашим враженням! Ваш відгук важливий для нас.
        </h2>
        <h3 className="feedbackPage__h3">
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
          {listQuestion.map((el: IQuestion) => {
            return (
              <div key={el.nameQuestion}>
                <h4>{el.question}</h4>
                <div>
                  {arrGrade.map((count: number) => {
                    return (
                      <label
                        htmlFor={`${el.nameQuestion}${count}`}
                        key={`${el.nameQuestion}${count}`}
                      >
                        <p>{count}</p>
                        <input
                          {...register(el.nameQuestion as keyof IFeedbackForm)}
                          type="radio"
                          value={count}
                          id={`${el.nameQuestion}${count}`}
                        />
                        <span className="checkMark"></span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

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
    </div>
  );
};

export default Feedback;
