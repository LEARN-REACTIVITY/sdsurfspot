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

it("calls submitHandler on submit", () => {
    const mockSubmitHandler = jest.fn()
    const component = mount (<Form onSubmit={mockSubmitHandler}/>)
    component.find('button#submit').simulate('click', {button: 0})
    expect(mockSubmitHandler.mock.calls.length).toBe(1)
})

it("passes values on submit", () => {
    const mockSubmitHandler = jest.fn()
    const component = mount(<Form onSubmit={mockSubmitHandler}/>)
    component.find('input[name="name"]').simulate('change', {target: {value: 'John', name: 'name'}})
    component.find('input[name="username"]').simulate('change', {target: {value: 'johndoesgood', name: 'username'}})
    component.find('input[name="email"]').simulate('change', {target: {value: 'johndo123@gmail.com', name: 'email'}})
    component.find('input[name="password"]').simulate('change', {target: {value: 'johndo123', name: 'password'}})
    component.find('button#submit').simulate('click', {button: 0})

    const submittedValues = mockSubmitHandler.mock.calls[0][0]

    expect(submittedValues["name"]).toBe("John")
    expect(submittedValues["username"]).toBe("johndoesgood")
    expect(submittedValues["email"]).toBe("johndo123@gmail.com")
    expect(submittedValues["password"]).toBe("johndo123")
})

it("shows flash message when there is and error", () => {
    const mockSubmitHandler = jest.fn()
    const validationErrors = [
        {
            param: 'name',
            msg: 'Is required.'
        }
    ]
    const component = mount(<Form onSubmit={mockSubmitHandler} errors={validationErrors}/>)
    expect(component.find(".alert-danger").length).toBe(1)
})

it("highlights name input when there is an error", () => {
    const mockSubmitHandler = jest.fn()
    const validationErrors = [
        {
            param: 'name',
            msg: 'Is required.'
        }
    ]
    const component = mount(<Form onSubmit={mockSubmitHandler} errors={validationErrors}/>)
    expect(component.find('#name-form-group.has-error').length).toBe(1)
})

it("highlights Username input when there is an error", () => {
    const mockSubmitHandler = jest.fn()
    const validationErrors = [
        {
            param: 'username',
            msg: 'Is required.'
        }
    ]
    const component = mount(<Form onSubmit={mockSubmitHandler} errors={validationErrors}/>)
    expect(component.find('#username-form-group.has-error').length).toBe(1)
})

it("highlights password input when there is an error", () => {
    const mockSubmitHandler = jest.fn()
    const validationErrors = [
        {
            param: 'password',
            msg: 'Is required.'
        }
    ]
    const component = mount(<Form onSubmit={mockSubmitHandler} errors={validationErrors}/>)
    expect(component.find('#password-form-group.has-error').length).toBe(1)
})

it("highlights email input when there is an error", () => {
    const mockSubmitHandler = jest.fn()
    const validationErrors = [
        {
            param: 'email',
            msg: 'Is required.'
        }
    ]
    const component = mount(<Form onSubmit={mockSubmitHandler} errors={validationErrors}/>)
    expect(component.find('#email-form-group.has-error').length).toBe(1)
})

it("no help message for name when there is no error", () => {
    const mockSubmitHandler= jest.fn()
    const component = mount(<Form onSubmit={mockSubmitHandler}/>)
    expect(component.find("#name-help-block").length).toBe(0)
})

it("shows help message for name when there is an error", () => {
    const mockSubmitHandler = jest.fn()
    const validationErrors = [
        {
            param: 'name',
            msg: 'Is required.'
        }
    ]
    const component = mount(<Form onSubmit={mockSubmitHandler} errors={validationErrors}/>)
    expect(component.find("#name-help-block").length).toBe(1)
})
