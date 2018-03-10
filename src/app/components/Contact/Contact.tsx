import * as React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { ILoginProps } from '../../actions';

import './Contact.scss';
import { toast } from 'react-toastify';

export class Contact extends React.Component<ILoginProps> {
  state = {
    loading: false,
    data: [],
    delete: null,
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
    console.log(this.state.delete);
    const itemList = this.state.data.map(item => (
      <Card expanded={item.expanded} onExpandChange={expanded => item.expanded = expanded} key={item.id}>
        <CardHeader
          title={item.userInfo.name}
          subtitle={item.userInfo.telephone}
          avatar={`assets/${item.userInfo.gender}.png`}
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
          <RaisedButton primary={true} label='Edit' />
          <RaisedButton label='Delete' onClick={() => this.setValue(item.id, 'delete')} />
        </CardActions>
      </Card>
    ));

    return (
      <div> {itemList} </div>
    );
  }

  componentWillMount() {
    this.load();
  }

  render() {
    return (
      <div>
        { this.state.loading ? this.loading() : this.list()}
        { this.confirm() }
      </div>
    );
  }
}
