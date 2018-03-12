import { UserInfoAction } from '../actions';
import { IStoreState } from '../types/index';
import { UPDATE_USER_INFO, UPDATE_LOGIN_INFO, OPEN_MODAL } from '../constants/index';

export function userInfo(state: IStoreState, action: UserInfoAction): IStoreState {
  switch (action.type) {
    case UPDATE_LOGIN_INFO:
      return { ...state, loginInfo: action.loginInfo };
    case OPEN_MODAL:
      return { ...state, createModal: action.value };
    default:
      return state;
  }
}
