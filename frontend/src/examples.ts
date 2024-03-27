// TODO: example of generic interface and generic function
// interface IBody<T, K = string> {
//   body: T;
//   pencil: K;
//   name: string;
// }

// const handelBody = (body: IBody<string, null>) => {
//   return body;
// };

// const compareGeneric = <K, T>(a: K, b: T) => {
//   if (typeof a == 'number' && typeof b == 'number') {
//     return a > b;
//   }

//   if (typeof a == 'string' && typeof b == 'string') {
//     return a.localeCompare(b);
//   }

//   return false;
// };

// compareGeneric<string, string>('5', '2');

// const compare = (a: string | number, b: string | number) => {
//   if (typeof a == 'number' && typeof b == 'number') {
//     return a > b;
//   }

//   if (typeof a == 'string' && typeof b == 'string') {
//     return a.localeCompare(b);
//   }

//   return false;
// };

//TODO: save for future generations
// .transform((_, val) => {
//   console.log('value', val);
//   console.log('isNaN', isNaN(val));
//   if (!isNaN(val) && val !== null && val !== '') {
//     // console.log('val', typeof val);
//     console.log('inside');

//     return +val;
//   } else {
//     console.log('vlad');
//     return undefined;
//   }
// })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const transformNumeric = (value: any, originalValue: any) => {
//   return !isNaN(originalValue) && originalValue !== null && originalValue !== ''
//     ? value
//     : undefined;
// };

//TODO:
// необходимо для того, чтобы каждый раз заново дергать yup чтобы
// получать уникальные значения, проблема гипотететическая
// const funcNumericValidator = (message: string) => {
//   return yup
//     .number()
//     .required(message)
//     .typeError('This field should be a number!')
//     .nullable()
//     .transform(transformNumeric);
// };

//TODO:
// константа создает одну ссылку на данные с yup (валидатор),
// которыей может возвращать одто и тоже значения для разныъ инпутом
// и они будут валидироватся одновременно
// const numericValidator = yup
//   .number()
//   .required('This field is required!')
//   .typeError('This field should be a number!')
//   .nullable()
//   .transform(transformNumeric);

// method of call object value
// const preparedData = {
//   name: 'art',
//   age: 22,
// };

// const ageExe = 'age';

// console.log('preparedData', preparedData.name);
// console.log('preparedData', preparedData['age']);
// console.log('preparedData', preparedData[ageExe]);

//example dynamically call element of object
// const uploadImag = 'uploadImage';
// const { [uploadImag]: _, ...preparedData } = data;
