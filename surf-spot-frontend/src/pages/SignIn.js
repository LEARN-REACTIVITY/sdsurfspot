import React, { Component } from 'react';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Row,
    Button,
    Alert,
    HelpBlock
} from 'react-bootstrap';
import Modal from './Modal'


const backApi =  "http://localhost:3000"

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            form:{
                username: "",
                password: ""
            }
        }

    }

    handleChange(event){
        const formState = Object.assign({}, this.state.form)
        formState[event.target.name] = event.target.value
        this.setState({form: formState})
    }

    handleSubmit() {
        this.props.Submit(this.state.form)
    }


    errorsFor(attribute){
        var errorString = ""
        if(this.props.errors){
            if(this.props.errors.validations) {
                const errors = this.props.errors.filter(error => error.param === attribute )
                if(errors){
                    errorString = errors.map(error => error.msg ).join(", ")
                }
            }
        }
        return errorString === "" ? null : errorString
    }


    render() {
        return(
            <div id="signIn">
                <div id="formBackground-signIn">
                    <div className="container-fluid-"><br/><br/><br/>
                        <div className="boxForm">
                            <div className="whiteboardForm">
                                <form>
                                    <h1 className="form-sign text-uppercase"> Log In! </h1>
                                    {this.props.errors &&
                                    <Alert bsStyle="danger">
                                        Username and/or Password is invalid.
                                    </Alert>
                                    }
                                    <FormGroup
                                        id="username-form-group"
                                        validationState={this.errorsFor('username') && 'error'}>
                                        <ControlLabel id="username">
                                            Username
                                        </ControlLabel>
                                        <FormControl
                                            type="text"
                                            name="username"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.form.username}
                                        />
                                        {this.errorsFor('username') &&
                                            <HelpBlock id="username-help-block">{this.errorsFor('username')}
                                            </HelpBlock>
                                        }
                                    </FormGroup>
                                    <FormGroup
                                        id="password-form-group"
                                        validationState={this.errorsFor('password') && 'error'}>
                                        <ControlLabel id="password">
                                            Password
                                        </ControlLabel>
                                        <FormControl
                                            type="password"
                                            name="password"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.form.password}
                                        />
                                        {this.errorsFor('password') &&
                                            <HelpBlock id="password-help-block">{this.errorsFor('password')}
                                            </HelpBlock>
                                        }
                                    </FormGroup>
                                    <Button id="submit" className="btn btn-primary btn-sm text-uppercase js-scroll-trigger" onClick={this.handleSubmit.bind(this)} >
                                        Log in
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
