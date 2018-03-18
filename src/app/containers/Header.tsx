import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ILoginProps, IUpdateLoginInfo } from '../actions';
import { ILoginInfo } from '../types/index';
import { Header } from '../components/Header/Header';
import { BASE_URL } from '../constants';

function mapStateToProps(state: ILoginProps) {
  return { ...state };
}

function mapDispatchToProps(dispatch: Dispatch<IUpdateLoginInfo>): ILoginProps {
  return {
    login: (username: string, password: string, success: Function, error: Function) => {
      const authenticator = btoa(`${username}:${password}`);
      const session = axios.create({
        baseURL: BASE_URL,
        headers: {
          'Authorization': `Basic ${authenticator}`,
          'Content-Type': 'application/json',
        }
      });

      session.get('/auth')
        .then(resp => {
          dispatch({ type: 'UPDATE_LOGIN_INFO', loginInfo: { isLogged: true, session } });
          success(resp);
        })
        .catch(e => error(e));

    },
    logout: () => {
      dispatch({ type: 'UPDATE_LOGIN_INFO', loginInfo: { isLogged: false } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
