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


export default class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            form:{
                name: "",
                username: "",
                password: "",
                email: ""
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
        console.log(this.state.form)
    }

    errorsFor(attribute){
        var errorString = ""
        if(this.props.errors){
            const errors = this.props.errors.filter(error => error.param === attribute )
            if(errors){
                errorString = errors.map(error => error.msg ).join(", ")
            }
        }
        return errorString === "" ? null : errorString
    }

    serverErrors(attribute) {
        var errorString = ""
        if(this.props.errors) {

                const error = this.props.errors[0].path
                if(error === attribute) {
                    if (error === "email") {
                    errorString = "This email is already in use"
                    } else if (error === "username") {
                        errorString = "This username has been taken"
                    }
                }
        }
        return errorString === "" ? null : errorString
    }

    render() {
        return(
        <div id="signUp">
            <div id="formBackground-signUp">
                <div className="container-fluid-"><br/><br/><br/>
                    <div className="boxForm">
                        <div className="whiteboardForm">
                            <form className="form">
                                <h1 className="form-sign text-uppercase"> Sign up! </h1>
                                {this.props.errors &&
                                <Alert bsStyle="danger">
                                    Please try again.
                                </Alert>
                                }
                                <FormGroup
                                    id="name-form-group"
                                    validationState={this.errorsFor('name') && 'error'}>
                                    <ControlLabel id="name">Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.form.name}
                                />
                                    {this.errorsFor('name') &&
                                    <HelpBlock id="name-help-block">{this.errorsFor('name')}</HelpBlock>
                                    }
                                </FormGroup>
                                    <FormGroup
                                        id="username-form-group"
                                        validationState={this.errorsFor('username') && 'error'}>
                                        <ControlLabel className="WarningFont" id="username">Username</ControlLabel>
                                        <FormControl
                                            type="text"
                                            name="username"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.form.username}
                                        />
                                        {this.errorsFor('username') &&
                                            <HelpBlock id="username-help-block">{this.errorsFor('username')}</HelpBlock>
                                        }
                                        {this.serverErrors('username') &&
                                            <HelpBlock id="username-help-block">{this.serverErrors('username')}</HelpBlock>
                                        }
                                </FormGroup>
                                <FormGroup
                                    id="password-form-group"
                                    validationState={this.errorsFor('password') && 'error'}>
                                    <ControlLabel id="password">Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.form.password}
                                    />
                                    {this.errorsFor('password') &&
                                        <HelpBlock id="password-help-block">{this.errorsFor('password')}</HelpBlock>
                                    }
                                </FormGroup>

                                <FormGroup
                                    id="email-form-group"
                                    validationState={this.errorsFor('email') && 'error'}>
                                    <ControlLabel id="email">Email</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.form.email}
                                />
                                    {this.errorsFor('email') &&
                                        <HelpBlock id="email-help-block">{this.errorsFor('email')}</HelpBlock>
                                    }
                                    {this.serverErrors('email') &&
                                        <HelpBlock id="email-help-block">{this.serverErrors('email')}</HelpBlock>
                                    }
                                </FormGroup>
                            </form>
                            <Button id="submit" className="btn btn-primary btn-sm text-uppercase js-scroll-trigger" onClick={this.handleSubmit.bind(this)} >Create an Account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
