import * as React from 'react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Hello from './Hello';

import {Link} from 'react-router-dom';

interface AppProps {
  message: string;
}

export default function({ message }: AppProps) {
  return (
    <div>
      <h1>Hello {message}</h1>
      <Link to="/foo"> foo</Link>
      <Button type="primary">Test</Button>
      <Hello />
    </div>
  );
}
