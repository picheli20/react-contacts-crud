import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IUserProps } from '../actions';
import { UserInfo } from '../components/UserInfo/UserInfo';

function mapStateToProps(state: IUserProps) {
  return { ...state };
}

function mapDispatchToProps(dispatch: Dispatch<any>): IUserProps {
  return {
    onSubmit: () => console.log('userinfo.edit'),
    fieldChange: (value, key) => dispatch({ type: 'UPDATE_USER_INFO', key, value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
