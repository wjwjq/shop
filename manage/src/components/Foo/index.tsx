import * as React from 'react';
import { Button } from 'antd';
import { Users, User } from '../../store/foo/types';

interface Props {
  users: any[];
  fetchUser(): void;
}

interface State {
  aaa: string;
}

export default class Foo extends React.Component<Props, State> {

  state = {
    aaa: 'aaa'
  };

  public fetch = () => {
    this.props.fetchUser();
  }

  public render() {
    const { users } = this.props;
    return (
      <div className="foo">
        {renderUsers(users)}
        <Button onClick={this.fetch} >加载</Button>
      </div>
    );
  }
}

function renderUsers(users: Users): React.ReactNodeArray {
  return users.map((user: User) => {
    return (
      <li key={user._id || user.id}>
        <span>{user.name}</span>
        <span>{user.age}</span>
        <span>{user.address}</span>
      </li>
    );
  });
}
