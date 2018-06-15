import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import * as actions from '../store/foo/actions';
import * as FooTypes from '../store/foo/types';
import { ApplicationState } from '../store/reducer';

import Foo from '../components/Foo';

interface IOwnProps {
  users: FooTypes.Users;
}

interface IDispatchProps {
  fetchUser(action: any): void;
}

const mapStateToProps = ({ foo: { users } }: ApplicationState): IOwnProps => ({
  users: users!
});

const mapDispatchToProps = (dispatch: Dispatch<FooTypes.FooActions>): IDispatchProps => bindActionCreators({
  fetchUser: actions.fetchUserAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Foo);
