import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ILoginProps, IUpdateLoginInfo } from '../actions';
import { ILoginInfo } from '../types/index';
import { Header } from '../components/Header/Header';
import { BASE_URL, authenticatorStorage } from '../constants';

function mapStateToProps(state: ILoginProps) {
  return { ...state };
}

function mapDispatchToProps(dispatch: Dispatch<IUpdateLoginInfo>): ILoginProps {
  return {
    login: (authenticator: string, success: Function, error: Function) => {
      const session = axios.create({
        baseURL: BASE_URL,
        headers: {
          'Authorization': `Basic ${authenticator}`,
          'Content-Type': 'application/json',
        }
      });

      session.get('/auth')
        .then(resp => {
          localStorage.setItem(authenticatorStorage, authenticator);
          dispatch({ type: 'UPDATE_LOGIN_INFO', loginInfo: { isLogged: true, session } });
          success(resp);
        })
        .catch(e => error(e));

    },
    logout: () => {
      localStorage.removeItem(authenticatorStorage);
      dispatch({ type: 'UPDATE_LOGIN_INFO', loginInfo: { isLogged: false } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
