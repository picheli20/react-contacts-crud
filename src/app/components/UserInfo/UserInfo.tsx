import * as React from 'react';
import axios from 'axios';
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
import { IViaCepResp } from '../../types/ViaCep.interface';

export class UserInfo extends React.Component<IModalProps> {
  userInfo: IUserInfo = {};
  address: IAddress = {};

  state = {
    isCompany: false,
    data: [],
    loading: false,
    userInfo: this.userInfo,
    address: this.address,
    steps: ['userInfo', 'address'],
    currentStep: 'userInfo',
    validation: {},
    id: null,
  };

  componentWillMount() {
    if (this.props.edit) {
      this.setValue(this.props.edit.address, 'address');
      this.setValue(this.props.edit.userInfo, 'userInfo');
      this.setValue(this.props.edit.id, 'id');
    }
  }

  setValue(value: any, key: string, obj?: string) {
    // parse to int the streetNumber
    if (key === 'streetNumber') {
      value = parseInt(value, 10);
    }
    if (obj) {
      this.state[obj][key] = value;
    } else {
      this.state[key] = value;
    }

    this.setState({ ...this.state});
  }

  onClose() {
    this.setState({
      ...this.state,
      userInfo: {},
      address: {},
      steps: ['userInfo', 'address'],
      currentStep: 'userInfo',
    });
    this.props.onClose();
  }

  handleSubmit() {
    this.props.onSubmit({
      userInfo: this.state.userInfo,
      address: this.state.address,
    }, this.state.id);
  }

  searchZip(name: string, type: string) {
    let zipValue = this.state[type][name];

    if (!zipValue) {
      return;
    }

    axios.get(`https://viacep.com.br/ws/${zipValue.replace(/\D/g, '')}/json/`)
      .then(({ data }: { data: IViaCepResp}) => this.setState({
        ...this.state,
        address: {
          ...this.state.address,
          neighborhood: data.bairro || this.state.address.neighborhood,
          streetName: data.logradouro || this.state.address.streetName,
          complement: data.complemento || this.state.address.complement,
          city: data.localidade || this.state.address.city,
          state: data.uf || this.state.address.state,
        },
      }))
      .catch(e => console.error(e));
  }

  buildForm(type: string, fieldMap: IField[]) {
    return fieldMap.map((item: IField, index: number) => {
      // don't show not visible fields
      if (!item.visible) {
        return;
      }

      const props: any = {
        key: `${type}-${index}`,
        className: 'field',
        floatingLabelText: item.label,
        onChange: event => this.setValue(event.target.value, item.name, type),
        name: item.name,
        value: this.state[type][item.name],
        validators: item.validators,
        errorMessages: item.errorMessages,
      };

      if (item.onBlurFunction) {
        props.onBlur = () => this[item.onBlurFunction](item.name, type);
      }

      switch (item.type) {
        case 'text':
          return (
            <TextValidator {...props} />
          );
        case 'select':
          return (
            <SelectValidator {...props} onChange={(event, index, value) => this.setValue(value, item.name, type)}>
              {item.options.map((item, i) => <MenuItem key={i} value={item.value} primaryText={item.label}/>)}
            </SelectValidator>
          );
      }
    });
  }

  getCurrentStepForm(currentStep: string) {
    const type = this.props.type || 'user'; // 'user' as default

    let fieldMap: IField[];
    let title;
    switch (currentStep) {
      case 'userInfo':
        fieldMap = fields.userInfo[type];
        title = 'Informações';
        break;
      case 'address':
        fieldMap = fields.address as IField[];
        title = 'Endereco';
        break;
    }

    return <div className='field-wrapper'>
      <h4>{title}</h4>
      {this.buildForm(currentStep, fieldMap)}
    </div>;
  }

  getForm() {
    const currentStep = this.state.currentStep;
    const steps = this.state.steps;
    const nextStep = steps[steps.indexOf(currentStep) + 1];
    const isLastStep = steps.indexOf(currentStep) === steps.length - 1;

    return (
      <ValidatorForm
        instantValidate
        ref='form'
        onSubmit={() => isLastStep ? this.handleSubmit() : this.setValue(nextStep, 'currentStep')}>
        {this.getCurrentStepForm(currentStep)}
        <div className='action-buttons'>
          <RaisedButton
            className='button'
            label='Cancelar'
            primary={true}
            disabled={this.state.loading}
            onClick={() => this.onClose()} />

          <RaisedButton
            className='button'
            label={isLastStep ? (this.state.id ? 'Editar' : 'Adicionar') : 'Próximo'}
            type='submit' />
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
        open={this.props.isOpen}>
        {this.getForm()}
      </Dialog>
    );
  }
}

