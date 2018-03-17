import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';

import { IUserInfo, IStoreState, IAddress } from '../../types';
import { IModalProps } from '../../actions';
import { fields, IField } from './UserInfo-config';

import './UserInfo.scss';

export class UserInfo extends React.Component<IModalProps> {
  userInfo: IUserInfo = {};
  address: IAddress = {};

  state = {
    isCompany: false,
    data: [],
    loading: false,
    userInfo: this.userInfo,
    address: this.address,
  };

  setValue(value: any, key: string, obj?: string) {
    console.log('set value', value);
    if (obj) {
      this.state[obj][key] = value;
    } else {
      this.state[key] = value;
    }

    this.setState({ ...this.state});
  }

  handleSubmit(a: any) {
    console.log(a);
  }

  componentWillMount() {
    console.log(this.props);
  }

  buildForm(type: string, fieldMap: IField[]) {
    return fieldMap.map((item: IField, index: number) => {
      // don't show not visible fields
      if (!item.visible) {
        return;
      }

      const props = {
        key: index,
        className: 'field',
        floatingLabelText: item.label,
        onChange: event => this.setValue(event.target.value, item.name, type),
        name: item.name,
        value: this.state[type][item.name],
        validators: item.validators,
        errorMessages: item.errorMessages,
      };

      switch (item.type) {
        case 'text':
          return (<TextValidator {...props} />);
        case 'select':
        return (<SelectValidator {...props} onChange={(event, index, value) => this.setValue(value, item.name, type)}>
          {item.options.map((item, i) => <MenuItem key={i} value={item.value} primaryText={item.label}/>)}
        </SelectValidator>);
      }
    });
  }

  getForm() {
    console.log(this.state.address);
    const type = 'company'; // user
    return (
      <ValidatorForm onSubmit={this.handleSubmit} >
        <h4>Infos</h4>
        <div className='field-wrapper'>
          {this.buildForm('userInfo', fields.userInfo[type])}
        </div>
        <h4>Endereco</h4>
        <div className='field-wrapper'>
          {this.buildForm('address', fields.address as IField[])}
        </div>
        <div className='action-buttons'>
          <RaisedButton
            label='Cancelar'
            primary={true}
            disabled={this.state.loading}
            onClick={() => this.props.onClose()} />

          <RaisedButton
            label='Adicionar'
            type='submit'
            disabled={this.state.loading} />
        </div>
      </ValidatorForm>
    );
  }

  render() {
    const customContentStyle = {
      width: '90%',
      maxWidth: 'none',
    };

    return (
      <Dialog
        contentStyle={customContentStyle}
        modal={true}
        autoScrollBodyContent={true}
        open={this.props.isOpen}
      >
        {this.getForm()}
      </Dialog>
    );
  }
}

