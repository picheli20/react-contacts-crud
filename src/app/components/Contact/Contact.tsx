import * as React from 'react';
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
import { IContact } from '../../types';

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

  list() {
    if (this.state.data.length === 0) {
      return (<div>
        <div className='no-items'>Você ainda não tem nada cadastrado</div>
      </div>);
    }

    return this.state.data.map(item => (
      <Card expanded={item.expanded} onExpandChange={expanded => item.expanded = expanded} key={item.id}>
        <CardHeader
          className='cardheader'
          title={item.userInfo.name}
          subtitle={item.userInfo.telephone}
          avatar={`assets/${item.userInfo.gender || 'company'}.png`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        {/* <CardMedia
          expandable={true}
          overlay={<CardTitle title='Overlay title' subtitle='Overlay subtitle' />}
        >
          <img src='images/nature-600-337.jpg' alt='' />
        </CardMedia> */}
        {/* <CardTitle title='Card title' subtitle='Card subtitle' expandable={true} /> */}
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions expandable={true} className='actions'>
          <RaisedButton primary={true} label='Edit' onClick={() => this.toggle(true, item.userInfo.cpf ? 'user' : 'company', item)} />
          <RaisedButton label='Delete' onClick={() => this.setValue(item.id, 'delete')} />
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
