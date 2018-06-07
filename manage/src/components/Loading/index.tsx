import * as React from 'react';
import CSSModules from 'react-css-modules';
import { Spin } from 'antd';
import * as styles from './style.less';

function Loading() {
  return (
    <div styleName="loading">
      <div styleName="loading-inner">
        <Spin size="large" />
        <span>加载中...</span>
      </div>
    </div>
  );
}

export default CSSModules(Loading, styles);
