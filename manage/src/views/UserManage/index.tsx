import * as React from 'react';
// import TableCURD from '../../components/TableCURD';
import UserTable from '../../components/UserTable';

import { ColumnProps } from 'antd/lib/table';

interface IUser {
  key: number;
  name: string;
  age: number;
  address: string;
}

const columns: Array<ColumnProps<IUser>> = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age'
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address'
}];

const api = '/api/user';

export default class UserManage extends React.Component {
  render() {
    return (
      <UserTable columns={columns} api={api} />
    );
  }
}

// export function mapStateToProps({ hello: {enthusiasmLevel, languageName} }: State) {
//   return {
//     enthusiasmLevel,
//     name: languageName
//   };
// }

// export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
//   return {
//     onIncrement: () => dispatch(actions.incrementEnthusiasm()),
//     onDecrement: () => dispatch(actions.decrementEnthusiasm())
//   };
// }

// @connect(mapStateToProps, mapDispatchToProps)
