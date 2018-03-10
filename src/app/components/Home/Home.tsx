import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '../../containers/Header';
import UserInfo from '../../containers/UserInfo';
import Contact from '../../containers/Contact';
import { IUserProps } from '../../actions';

import './Home.scss';
import '../../../assets/sadpanda.png';
export class Home extends React.Component<IUserProps> {

  notLoggedTemplate() {
    return (
      <div className='not-logged text-center'>
        <img src='../../../assets/sadpanda.png'/>
        <div className='description'>
          Você precisa estar logado
        </div>
      </div>
    );
  }

  getLobby() {
    return (
      // <UserInfo />
      <Contact />
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          {this.props.loginInfo.isLogged ? this.getLobby() : this.notLoggedTemplate()}
        </div>
        <ToastContainer />
      </div>
    );
  }
}
