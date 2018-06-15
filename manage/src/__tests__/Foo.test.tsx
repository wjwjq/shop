import * as React from 'react';
import {shallow} from 'enzyme';

import Foo from '../components/Foo';

const setUp = () => {
  const props = {
    users: []
    fetchUser: jest.fn() // mock
  };
  const wrapper = shallow(<Foo {...props} />);

  return {
    props,
    wrapper
  };
};

it('renders the correct text when no enthusiasm level is given', () => {
  const  {wrapper} = setUp();
  expect(wrapper.find('Button').text()).toEqual('加载');
});
