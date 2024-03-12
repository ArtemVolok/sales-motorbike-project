export interface IRegistrationForm {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  confPassword: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}
