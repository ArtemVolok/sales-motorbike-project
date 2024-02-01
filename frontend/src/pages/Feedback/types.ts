export interface IFeedbackForm {
  gender: string;
  age: number;
  // musicInfluence: number;
  totalImpression: number;
  generalAppearance: number;
  designAppeal: number;
  colorPalette: number;
  fontCompatibility: number;
  searchInfo: number;
  organizationNavigation: number;
  usabilityAdaptive: number;
  useOnMobile: number;
  // experienceWithMusic: number;
  // timeWithMusic: number;
  expressionWithMusic: number;
}

export interface IQuestion {
  question: string;
  nameQuestion: string;
}

export const arrGrade: number[] = [1, 2, 3, 4, 5];
export const listQuestion: IQuestion[] = [
  // {
  //   question:
  //     'Чи вплинула фонова музика на вашу загальну атмосферу під час перегляду сайту?',
  //   nameQuestion: 'musicInfluence',
  // },
  {
    question:
      'Як ви оцінюєте загальний враження від візуального та аудіо дизайну?',
    nameQuestion: 'totalImpression',
  },
  {
    question: 'Оцініть загальний зовнішній вигляд веб-додатку?',
    nameQuestion: 'generalAppearance',
  },
  {
    question: 'Як ви оцінюєте привабливість та сучасність дизайну сайту?',
    nameQuestion: 'designAppeal',
  },
  {
    question:
      'Чи добре ви сприймаєте колірну палітру та засоби візуальної ідентифікації сайту?',
    nameQuestion: 'colorPalette',
  },
  {
    question:
      'Як ви оцінюєте відповідність шрифту і кольорової гами в дизайні до тематики сайту?',
    nameQuestion: 'fontCompatibility',
  },
  {
    question: 'Чи легко ви знаходите потрібну інформацію на сайті?',
    nameQuestion: 'searchInfo',
  },
  {
    question: 'Чи задоволені ви організацією навігації на сайті?',
    nameQuestion: 'organizationNavigation',
  },
  {
    question:
      'Як ви вважаєте, чи полегшує адаптивний дизайн сайту вам процес вибору та порівняння мотоциклів на різних пристроях?',
    nameQuestion: 'usabilityAdaptive',
  },
  {
    question:
      'Як ви оцінюєте зручність використання сайту на мобільних пристроях?',
    nameQuestion: 'useOnMobile',
  },
  // {
  //   question:
  //     'Чи вважаєте ви, що фонова музика покращує загальний користувальницький досвід на сайті?',
  //   nameQuestion: 'experienceWithMusic',
  // },
  // {
  //   question: 'Чи вплинула музика на вашу тривалість перебування на сайт?',
  //   nameQuestion: 'timeWithMusic',
  // },
  {
    question: 'Оцініть вплив сайту на ваше враження про продукт?',
    nameQuestion: 'expressionWithMusic',
  },
];
