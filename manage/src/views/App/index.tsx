/// <reference path="../../index.d.ts" />

import * as React from 'react';
import CSSModules from 'react-css-modules';

import { Layout, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

import Hello from '../Hello';
import Nav from '../Nav';

import * as styles from './style.less';
import * as logoSrc from '../../assets/images/logo.png';

@CSSModules(styles, {
  allowMultiple: true
})
export default class App extends React.Component {

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    console.log(this.props);
    return (
      <Layout styleName="main-layout" >

        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div styleName="logo">
            <img src={logoSrc} alt="logo" />
            <span>XX管理系统</span>
          </div>

          <Nav />

        </Sider>

        <Layout>

          <Header styleName="header">
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>

          <Content styleName="content">
            {this.props.children}
          </Content>

        </Layout>

      </Layout>
    );
  }
}
