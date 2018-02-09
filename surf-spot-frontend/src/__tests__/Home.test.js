import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../pages/Home';
import { mount } from 'enzyme'

const beaches = [
    {
        name:'PB',
        location: 'Pacific Beach'
    },
    {
        name:'blacks',
        location: 'La Jolla'
    }
]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home beaches={beaches}/>, div);
});

it('renders about staff', () => {
    const home = mount(<Home beaches={beaches}/>)
    expect(home.find('.about').text()).toEqual('About Our Staff')
})
