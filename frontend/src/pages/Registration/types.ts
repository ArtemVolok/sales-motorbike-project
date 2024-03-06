export interface ICreateUserProfileData {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface IRegistrationForm extends ICreateUserProfileData {
  confPassword: string;
}

export interface IRegistrationFormInputs {
  type: string;
  registerName: string;
  label: string;
}

export interface ISuccessCreateUserProfile {
  accessToken: string;
  refreshToken: string;
  payload: {
    id: string;
    userEmail: string;
    isActivated: boolean;
  };
}
