import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';

import { IUserInfo, IStoreState } from '../../types';
import { IModalProps } from '../../actions';

import './UserInfo.scss';

// post example
// {
//   userInfo: {
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


export class UserInfo extends React.Component<IModalProps> {
  state = {
    isCompany: false,
    data: [],
    loading: false,
    userInfo: {
      name: null,
      cpf: null,
      cnpj: null,
      gender: null,
      website: null,
      email: null,
      telephone: null
    },
    address: {
      streetName: null,
      streetNumber: null,
      neighborhood: null,
      complement: null,
      zip: null,
      city: null,
      state: null,
      country: null
    },
  };

  setValue(value: any, key: string, obj?: string) {
    if (obj) {
      this.state[obj][key] = value;
    } else {
      this.state[key] = value;
    }

    this.setState({ ...this.state});
  }

  getForm() {
    let { userInfo, address } = this.state;
    let extraFields = (
      <TextField
        floatingLabelText='CPF'
        className='form-item'
        value={userInfo.cpf}
        onChange={event => this.setValue(event.target.value, 'cpf', 'userInfo')}
      />
    );

    if (this.state.isCompany) {
      extraFields = (
        <TextField
          floatingLabelText='CNPJ'
          className='form-item'
          value={userInfo.cnpj}
          onChange={event => this.setValue(event.target.value, 'cnpj', 'userInfo')}
        />
      );
    }

    return (
      <div>
        <h1>Informacoes Pessoais</h1>
        <TextField
          className='form-item'
          floatingLabelText='Nome'
          value={userInfo.name}
          onChange={event => this.setValue(event.target.value, 'name', 'userInfo')}
        />
        {extraFields}
        <RadioButtonGroup
          name='shipSpeed'
          defaultSelected='m'
          onChange={event => console.log(event.target.value, 'website', 'userInfo')}>
          <RadioButton
            value='m'
            label='Homem'
          />
          <RadioButton
            value='f'
            label='Mulher'
          />
        </RadioButtonGroup>
        <TextField
          className='form-item'
          floatingLabelText='Website'
          value={userInfo.website}
          onChange={event => this.setValue(event.target.value, 'website', 'userInfo')}
        />
        <TextField
          className='form-item'
          floatingLabelText='E-mail'
          value={userInfo.email}
          onChange={event => this.setValue(event.target.value, 'email', 'userInfo')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Website'
          value={userInfo.website}
          onChange={event => this.setValue(event.target.value, 'website', 'userInfo')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Website'
          value={userInfo.telephone}
          onChange={event => this.setValue(event.target.value, 'telephone', 'userInfo')}
        />
        <h1>Endereco</h1>
        <TextField
          className='form-item'
          floatingLabelText='Rua'
          value={address.streetName}
          onChange={event => this.setValue(event.target.value, 'streetName', 'address')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Numero'
          value={address.streetNumber}
          onChange={event => this.setValue(event.target.value, 'streetNumber', 'address')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Bairro'
          value={address.neighborhood}
          onChange={event => this.setValue(event.target.value, 'neighborhood', 'address')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Complemento'
          value={address.complement}
          onChange={event => this.setValue(event.target.value, 'complement', 'address')}
        />
        <TextField
          className='form-item'
          floatingLabelText='CEP'
          value={address.zip}
          onChange={event => this.setValue(event.target.value, 'zip', 'address')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Cidade'
          value={address.city}
          onChange={event => this.setValue(event.target.value, 'city', 'address')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Estado'
          value={address.state}
          onChange={event => this.setValue(event.target.value, 'state', 'address')}
        />
        <TextField
          className='form-item'
          floatingLabelText='Pais'
          value={address.country}
          onChange={event => this.setValue(event.target.value, 'country', 'address')}
        />
      </div>
    );
  }

  getDialog() {
    console.log(this.props);

    const actions = [
      <RaisedButton
        label='Cancelar'
        primary={true}
        disabled={this.state.loading}
        onClick={() => this.props.onClose()}
      />,
      <RaisedButton
        label='Save'
        disabled={this.state.loading}
        onClick={() => this.props.onSubmit(this.state.userInfo)}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={true}
        autoScrollBodyContent={true}
        open={this.props.isOpen}
      >
        {this.getForm()}
      </Dialog>
    );
  }

  render() {
    return this.getDialog();
  }
}

