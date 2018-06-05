import Hello from '../components/Hello';
import * as actions from '../redux/actions/Hello';
import { StoreState } from '../redux/reducers/hello';
import { connect, Dispatch } from 'react-redux';

interface State {
  hello: StoreState;
}

export function mapStateToProps({ hello }: State) {
  return {
    ...hello,
    name: hello.languageName
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
