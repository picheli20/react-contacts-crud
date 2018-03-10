import { IUserInfo, ILoginInfo } from '../types/';
import * as constants from '../constants';

export interface IUserProps {
  onSubmit?: () => void;
  fieldChange?: (value: string, key: string) => any;
  userInfo?: IUserInfo;
  loginInfo?: ILoginInfo;
}

export interface ILoginProps {
  login?: (username: string, password: string, success: Function, error: Function) => void;
  logout?: () => void;
  loginInfo?: ILoginInfo;
}

export interface IUpdateUserInfo {
  type: constants.UPDATE_USER_INFO;
  key: string;
  value: any;
}

export interface IUpdateLoginInfo {
  type: constants.UPDATE_LOGIN_INFO;
  loginInfo: ILoginInfo;
}

export type UserInfoAction = IUpdateUserInfo | IUpdateLoginInfo;
