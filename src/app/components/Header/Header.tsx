import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { toast } from 'react-toastify';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { ILoginProps } from '../../actions';
import { authenticatorStorage } from '../../constants';

import './Header.scss';

const modalSm = {
  maxWidth: '300px',
};

export class Header extends React.Component<ILoginProps> {
  state = {
    open: false,
    loading: false,
    username: '',
    password: '',
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({open: false});

  // load the data from server when we have loginInfo.session available
  componentWillMount() {
    const authenticator = localStorage.getItem(authenticatorStorage);
    if (authenticator) {
      this.login(authenticator);
    }
  }

  success() {
    this.setValue(false, 'loading');
    this.handleClose();
  }

  error(error: any) {
    this.setValue(false, 'loading');

    if (error.response.status === 401) {
      toast.error('Usuário ou senha inválidos');
    } else {
      toast.error('Ops! Algo inesperado ocorreu');
    }
  }

  logout = () => this.props.logout();

  login(authenticator: string = btoa(`${this.state.username.toLowerCase()}:${this.state.password}`)) {
    this.setValue(true, 'loading');
    this.props.login(authenticator, () => this.success(), error => this.error(error));
  }

  setValue(value: any, key: string) {
    this.state[key] = value;
    this.setState({ ...this.state});
  }

  getDialog() {
    return (
      <Dialog
        title='Login'
        modal={false}
        contentStyle={modalSm}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
      <ValidatorForm
        instantValidate
        className='form-dialog'
        ref='form'
        onSubmit={() => this.login()}>

          <TextValidator
            floatingLabelText='Email'
            name='email'
            value={this.state.username}
            style={{ width: '100%' }}
            validators={['required']}
            errorMessages={['Este campo é obrigatório']}
            onChange={event => this.setValue(event.target.value, 'username')}
          />
          <TextValidator
            floatingLabelText='Password'
            name='password'
            type='password'
            value={this.state.password}
            style={{ width: '100%' }}
            validators={['required']}
            errorMessages={['Este campo é obrigatório']}
            onChange={event => this.setValue(event.target.value, 'password')}
          />

          <RaisedButton
            className='submit-buttom'
            secondary={true}
            type='submit'
            label='Login'
            disabled={this.state.loading} />
        </ValidatorForm>
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        <AppBar
          title='Contacts'
          iconElementLeft={<IconButton><ActionHome /></IconButton>}
          iconElementRight={
            this.props.loginInfo.isLogged ?
              <FlatButton label='Logout' onClick={this.logout} /> :
              <FlatButton label='Login' onClick={this.handleOpen} />
          }
        />
        {this.getDialog()}
      </div>
    );
  }
}
