import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { IUserInfo, IStoreState } from '../../types';
import { IUserProps } from '../../actions';

import './UserInfo.scss';

// post example
// {
//   "userInfo": {
//     "name": "Joao Silva",
//     "cpf": "12312312312312",
//     "gender": "m",
//     "website": "www.test.com",
//     "email": "test@test.com",
//     "telephone": "+55 11 9930 1251"
//   },
//   "address": {
//     "streetName": "Rua Test",
//     "streetNumber": 123,
//     "neighborhood": "Bairro",
//     "complement": "Edificio B",
//     "zip": "05345-000",
//     "city": "São Paulo",
//     "state": "São Paulo",
//     "country": "Brazil"
//   }
// }


export class UserInfo extends React.Component<IUserProps> {
  onSubmit = () => event => {
    event.preventDefault();
    this.props.onSubmit();
  }

  fieldChange = (event, key) => {
    this.props.fieldChange(event.target.value, key);
    this.forceUpdate();
  }

  getForm() {
    let { userInfo } = this.props;
    return (
      <form onSubmit={this.onSubmit()}>
        <TextField
          floatingLabelText='Nome'
          value={userInfo.name}
          onChange={event => this.fieldChange(event, 'name')}
        />
        <TextField floatingLabelText='CPF/CNPJ'
          value={userInfo.cnpj}
          onChange={event => this.fieldChange(event, 'cnpj')}
        />
        <SelectField
          floatingLabelText='Gênero'
          value={userInfo.gender}
          onChange={event => this.fieldChange(event, 'gender')}
        >
          <MenuItem value='m' primaryText='Masculino' />
          <MenuItem value='f' primaryText='Feminino' />
        </SelectField>
        <TextField floatingLabelText='Website' />
        <TextField floatingLabelText='E-mail' />
        <TextField floatingLabelText='Telefone' />
        <TextField floatingLabelText='Endereco' />
        {/* disabled={this.props.inProgress} */}
        <RaisedButton label='submit' onClick={this.onSubmit()} />
      </form>
    );
  }

  getLobby() {
    return (
      <div> I'm the home page </div>
    );
  }

  render() {
    return (
      this.getLobby()
    );
  }
}

