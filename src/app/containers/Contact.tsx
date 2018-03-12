import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IUserProps } from '../actions';
import { Contact } from '../components/Contact/Contact';

function mapStateToProps(state: IUserProps) {
  return { ...state };
}

function mapDispatchToProps(dispatch: Dispatch<any>): IUserProps {
  return {
    toggleModal: (value: boolean) => {
      dispatch({ type: 'OPEN_MODAL', value });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
