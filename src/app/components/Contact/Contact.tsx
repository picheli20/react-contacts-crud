import * as React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import { toast } from 'react-toastify';

// icons
import AddIcon from 'material-ui/svg-icons/content/add';
import CompanyIcon from 'material-ui/svg-icons/communication/business';
import UserIcon from 'material-ui/svg-icons/action/accessibility';

import { UserInfo } from '../UserInfo/UserInfo';
import { IUserProps } from '../../actions';
import { IContact, IContactList } from '../../types';

import './Contact.scss';

export class Contact extends React.Component<IUserProps> {
  state = {
    loading: false,
    data: [],
    delete: null,
    editing: null,
    type: null, // type of the form, can be: 'user' or 'company'
    menuOpen: false,
  };

  setValue(value: any, key: string) {
    this.state[key] = value;
    this.setState({ ...this.state});
  }

  load() {
    this.setValue(true, 'loading');
    this.props.loginInfo.session.get('/contacts').then(resp => {
      this.setValue(false, 'loading');
      this.setValue(resp.data, 'data');
    });
  }

  deleteItem() {
    this.setValue(true, 'loading');
    const id = this.state.delete;
    if (!id) {
      return;
    }

    this.setValue(null, 'delete');
    this.props.loginInfo.session.delete(`/contacts/${id}`).then(resp => {
      this.setValue(false, 'loading');
      this.load();
      toast.success('Deletado');
    }).catch(() => toast.error('Ops! Algo inesperado ocorreu'));

  }

  handleFormSubmit(data: IContact, id: string) {
    this.setValue(true, 'loading');

    let request;

    if (id) {
      request = this.props.loginInfo.session.put(`/contacts/${id}`, data);
    } else {
      request = this.props.loginInfo.session.post('/contacts', data);
    }

    request.then(resp => {
      toast.error(`${data.userInfo.name} ${id ? 'editado' : 'criado'}`);
      this.toggle(false);
      this.load();
    }).catch(e => toast.error(`Algo inesperado ocorreu ao tentar ${id ? 'editar' : 'criar'}: ${data.userInfo.name}`));
  }

  // load the data from server when we have loginInfo.session available
  componentWillMount() {
    this.load();
  }

  toggle(value: boolean = !this.props.createModal, type?: 'user' | 'company', editing?: IContact) {
    this.setValue(type, 'type');
    this.setValue(false, 'menuOpen');
    this.setValue(editing, 'editing');
    this.props.toggleModal(value);
  }

  confirm() {
    const actions = [
      <RaisedButton
        label='Cancelar'
        primary={true}
        disabled={this.state.loading}
        onClick={() => this.setValue(null, 'delete')}
      />,
      <RaisedButton
        label='Deletar'
        disabled={this.state.loading}
        onClick={() => this.deleteItem()}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.delete !== null}
          onRequestClose={() => this.state.delete = null}
        >
          Tem certeza que deseja deletar este contato?
        </Dialog>
      </div>
    );
  }

  loading() {
    return (
      <div className='loader'> <CircularProgress size={80} thickness={5} /> </div>
    );
  }

  fetchMap(item: IContactList, mapProps: any, map: any) {
    const {google} = mapProps;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      'address': `${item.address.streetName} ${item.address.streetNumber} - ${item.address.city}/ ${item.address.state}  ${item.address.country}`
    }, (results: any, status: any) => {
      if (status === google.maps.GeocoderStatus.OK) {
        item.location = {
          lat: results[0].geometry.location.lat(),
          lng:  results[0].geometry.location.lng(),
        };

        // add the custom market on the address
        new google.maps.Marker({ map, position: item.location });

        // center map
        map.panTo(new google.maps.LatLng(item.location.lat, item.location.lng));
      }
    });
  }

  list() {
    if (this.state.data.length === 0) {
      return (<div>
        <div className='no-items'>Você ainda não tem nada cadastrado</div>
      </div>);
    }

    return this.state.data.map((item: IContactList) => (
      <Card expanded={item.expanded} onExpandChange={expanded => item.expanded = expanded} key={item.id}>
        <CardHeader
          className='cardheader'
          title={`${item.userInfo.name}`}
            avatar={`assets/${item.userInfo.gender || 'company'}.png`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <div className='info-items'>
            <div className='info-item'>
              <div className='info-item-title'>Telefone</div>
              <div className='info-item-value'>{ item.userInfo.telephone }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>Email</div>
              <div className='info-item-value'>{ item.userInfo.email }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>{ item.userInfo.cpf ? `CPF` : `CNPJ` }</div>
              <div className='info-item-value'>{ item.userInfo.cpf || item.userInfo.cnpj }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>Cidade</div>
              <div className='info-item-value'>{`${item.address.city}` }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>Estado</div>
              <div className='info-item-value'>{`${item.address.state}` }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>País</div>
              <div className='info-item-value'>{`${item.address.country}` }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>Endereco</div>
              <div className='info-item-value'>{ `${item.address.streetName} ${item.address.streetNumber}` }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>Complemento</div>
              <div className='info-item-value'>{ item.address.complement || 'N/A' }</div>
            </div>
            <div className='info-item'>
              <div className='info-item-title'>Cep</div>
              <div className='info-item-value'>{ item.address.zip }</div>
            </div>
          </div>
        </CardText>
        <CardText expandable={true} className='map-container'>
          <Map zoom={13} google={this.props.google} onReady={(mapProps, map) => this.fetchMap(item, mapProps, map)}>

            {
              item.location ?
              <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={item.location} /> : console.log('no item.location for', item.userInfo.name)
            }
          </Map>
        </CardText>
        <CardActions expandable={true} className='actions'>
          { item.userInfo.website ?
            <RaisedButton
              label='Website'
              onClick={
                () =>
                  window.open(
                    item.userInfo.website.startsWith('http') ?
                      item.userInfo.website :
                      `http://${item.userInfo.website}`
                  , '_blank')} />
              : '' }
          <RaisedButton label='Edit' onClick={() => this.toggle(true, item.userInfo.cpf ? 'user' : 'company', item)} />
          <RaisedButton secondary={true} label='Delete' onClick={() => this.setValue(item.id, 'delete')} />
        </CardActions>
      </Card>
    ));
  }

  render() {
    let buttonOpenClass = '';
    if (this.state.menuOpen) {
      buttonOpenClass = 'create-button-open';
    }
    return (
      <div>
        { this.state.loading ? this.loading() : this.list()}
        { this.confirm() }
        {
          this.props.createModal ?
            <UserInfo
            isOpen={this.props.createModal}
            onClose={() => this.toggle(false)}
            onSubmit={(data, id) => this.handleFormSubmit(data, id)}
            edit={this.state.editing}
            type={this.state.type}
          /> : <span></span>
        }
        <FloatingActionButton
          className={`create-button ${buttonOpenClass}`}
          secondary={true}
          onClick={() => this.setValue(!this.state.menuOpen, 'menuOpen')}
        >
          <AddIcon />
        </FloatingActionButton>
        <FloatingActionButton
          className={`create-button-sub create-button-user ${buttonOpenClass}`}
          onClick={() => this.toggle(true, 'user')}
          mini={true}
        >
          <UserIcon />
        </FloatingActionButton>
        <FloatingActionButton
          className={`create-button-sub create-button-company ${buttonOpenClass}`}
          onClick={() => this.toggle(true, 'company')}
          mini={true}
        >
          <CompanyIcon />
        </FloatingActionButton>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyALby8WL_qnOlBZEo5dr7jp_7z0DnJtd78',
})(Contact);
