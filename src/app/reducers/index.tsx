import { UserInfoAction } from '../actions';
import { IStoreState } from '../types/index';
import { UPDATE_USER_INFO, UPDATE_LOGIN_INFO } from '../constants/index';

export function userInfo(state: IStoreState, action: UserInfoAction): IStoreState {
  switch (action.type) {
    case UPDATE_USER_INFO:
      if (!state.userInfo) {
        state.userInfo = {};
      }
      state.userInfo[action.key] = action.value;
      return { ...state, userInfo: state.userInfo };
    case UPDATE_LOGIN_INFO:
      return { ...state, loginInfo: action.loginInfo };
    default:
      return state;
  }
}
