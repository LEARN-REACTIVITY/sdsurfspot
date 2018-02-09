import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../pages/Form';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Form />, div);
});

it('has a name input', () => {
    const component = mount (<Form />)
    expect(component.find('label#name').text()).toBe("Name")
})

it('has a username input' , () => {
    const component = mount (<Form />)
    expect(component.find('label#username').text()).toBe("Username")
})

it('has an email input', () => {
    const component = mount (<Form />)
    expect(component.find('label#email').text()).toBe("Email")
})

it('has a password input', () => {
    const component = mount (<Form />)
    expect(component.find('label#password').text()).toBe("Password")
})

it('has a submit button', () => {
    const component = mount (<Form />)
    expect(component.find('button#submit').text()).toBe("Make an Account")
})
