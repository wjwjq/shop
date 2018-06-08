import * as React from 'react';

import axios from '../lib/axios';

interface Props {}

export default class Foo extends React.Component<Props, object> {

  fetch = () => {
    return axios.all([axios.get('/api/user'), axios.post('/api/user/2', {fs: '123'}), axios.get('/api/user/5b0f8e1afad9ad2d0cc9209a')]);
  }

  componentDidMount() {
    this.fetch().then(data => console.log(data));
  }

  render() {
    return (
      <div>Fooaaa</div>
    );
  }
}
