import { IUserInfo, ILoginInfo } from '../types/';
import * as constants from '../constants';

export interface IUserProps {
  onSubmit?: () => void;
  fieldChange?: (value: string, key: string) => any;
  toggleModal?: (value: boolean) => void;
  userInfo?: IUserInfo;
  loginInfo?: ILoginInfo;
  createModal?: boolean;
}

export interface IModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: any) => void;
  type?: string;
}

export interface ILoginProps {
  login?: (username: string, password: string, success: Function, error: Function) => void;
  logout?: () => void;
  loginInfo?: ILoginInfo;
}

export interface IToggleModal {
  type: constants.OPEN_MODAL;
  value: boolean;
}

export interface IUpdateLoginInfo {
  type: constants.UPDATE_LOGIN_INFO;
  loginInfo: ILoginInfo;
}

export type UserInfoAction =  IUpdateLoginInfo | IToggleModal;
