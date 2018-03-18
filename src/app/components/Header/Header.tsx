import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { toast } from 'react-toastify';

import { ILoginProps } from '../../actions';

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

  login() {
    this.setValue(true, 'loading');
    this.props.login(this.state.username, this.state.password, () => this.success(), error => this.error(error));
  }

  setValue(value: any, key: string) {
    if (key === 'username') {
      key = key.toLowerCase();
    }
    this.state[key] = value;
    this.setState({ ...this.state});
  }

  getDialog() {
    const actions = [
      <RaisedButton
        secondary={true}
        label='Login'
        onClick={() => this.login()}
        disabled={!this.state.username || !this.state.password || this.state.loading } />,
    ];

    return (
      <Dialog
        title='Login'
        actions={actions}
        modal={false}
        contentStyle={modalSm}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div className='form-dialog'>
          <TextField
            floatingLabelText='Email'
            value={this.state.username}
            style={{ width: '100%' }}
            errorText={!this.state.username && 'Este campo é obrigatório'}
            onChange={event => this.setValue(event.target.value, 'username')}
          />
          <TextField
            type='password'
            floatingLabelText='Password'
            value={this.state.password}
            style={{ width: '100%' }}
            errorText={!this.state.password && 'Este campo é obrigatório'}
            onChange={event => this.setValue(event.target.value, 'password')}
          />
        </div>
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
