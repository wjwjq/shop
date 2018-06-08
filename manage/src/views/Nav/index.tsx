import * as React from 'react';
import {  Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
    <Menu.Item key="1">
      <Link to="/user-manage">
        <Icon type="user" />
        <span>用户管理</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/goods-manage">
        <Icon type="book" />
        <span>商品管理</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/foo">
        <Icon type="book" />
        <span>request</span>
      </Link>
    </Menu.Item>
  </Menu>
  );
}
