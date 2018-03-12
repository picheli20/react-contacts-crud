import { AxiosInstance } from 'axios';

export interface IStoreState {
  loginInfo: ILoginInfo;
  createModal: boolean;
};
export interface ILoginInfo {
  session?: AxiosInstance;
  isLogged: boolean;
};

export interface IUserInfo {
  name?: string; // minLength: 3, maxLength: 100
  cpf?: string; // length: 11
  cnpj?: string; // length: 14
  gender?: 'm' | 'f';
  website?: string;
  email?: string;
  telephone?: string;
  address?: IAddress;
};

export interface IAddress {
  streetName?: string;
  streetNumber?: number;
  neighboorhood?: string;
  complement?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
};
