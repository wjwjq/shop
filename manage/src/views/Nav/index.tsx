import * as React from 'react';
import { Menu, Icon } from 'antd';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';

const menuItems = [
  {
    id: '0',
    text: '用户管理',
    path: '/user-manage',
    icon: 'book'
  },
  {
    id: '1',
    text: '商品管理',
    path: '/goods-manage',
    icon: 'book'
  },
  {
    id: '2',
    text: 'request',
    path: '/foo',
    icon: 'book'
  }
];

interface IProps extends RouteComponentProps<{}> {
}

class Nav extends React.Component<IProps, {}> {

  handleMenuItemClick = ({ key }: ClickParam) => {
    const menu = menuItems.find(item => item.id === key);
    if (menu) {
      this.props.history.push(menu.path);
    }
  }

  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[]} onClick={this.handleMenuItemClick}>
        {renderMenuItems()}
      </Menu>
    );
  }
}

function renderMenuItems() {
  return menuItems.map((item, idx) => (
    <Menu.Item key={idx}>
      <Icon type={item.icon} />
      <span>{item.text}</span>
    </Menu.Item>
  ));
}

export default withRouter(Nav);
