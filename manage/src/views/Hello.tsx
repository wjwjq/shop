import Hello from '../components/Hello';
import * as actions from '../store/hello/actions';
import { IHelloState, THelloAction } from '../store/hello/types';
import { connect, Dispatch } from 'react-redux';

interface State {
  hello: IHelloState;
}

export function mapStateToProps({ hello: {enthusiasmLevel, languageName} }: State) {
  return {
    enthusiasmLevel,
    name: languageName
  };
}

export function mapDispatchToProps(dispatch: Dispatch<THelloAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
