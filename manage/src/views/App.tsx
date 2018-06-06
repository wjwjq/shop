/// <reference path='../index.d.ts'/>

import * as React from 'react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Hello from './Hello';

import {Link} from 'react-router-dom';
import * as imgSrc from '../assets/images/test.jpg';
import * as imgSrc2 from '../assets/images/test2.jpg';

interface AppProps {
  message: string;
}

export default function({ message }: AppProps) {
  return (
    <div>
      <h1>Hello {message}</h1>
      <Link to="/foo"> foo</Link>
      <Button type="primary">Test</Button>
      <br />
      <i className="icon-shizhong" />
      <br />
      <img src={imgSrc} />
      <img src={imgSrc2} />
      <br />
      <Hello />
    </div>
  );
}
