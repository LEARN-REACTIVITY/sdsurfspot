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
} from 'react-bootstrap'

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
        this.props.onSubmit(this.state.form)
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


    render() {
        return(
            <div>
                <h1 className="signIn"> Sign in! </h1>
                <Row>
                    <Col md={4}>
                    </Col>
                    <Col md={4}>
                        <form>
                                <Row>
                                    <Col xs={6}>
                                        {this.props.errors &&
                                            <Alert bsStyle="danger">
                                                Username and/or Password is invalid.
                                            </Alert>
                                        }
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                        <FormGroup
                                            id="username-form-group"
                                            validationState={this.errorsFor('username') && 'error'}>
                                            <ControlLabel id="username">Username</ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="username"
                                                onChange={this.handleChange.bind(this)}
                                                value={this.state.form.username}
                                            />
                                            {this.errorsFor('username') &&
                                                <HelpBlock id="username-help-block">{this.errorsFor('username')}</HelpBlock>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                        <FormGroup
                                            id="password-form-group"
                                            validationState={this.errorsFor('password') && 'error'}>
                                            <ControlLabel id="password">Password</ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="password"
                                                onChange={this.handleChange.bind(this)}
                                                value={this.state.form.password}
                                            />
                                            {this.errorsFor('password') &&
                                                <HelpBlock id="password-help-block">{this.errorsFor('password')}</HelpBlock>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                        <Button id="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)} >Sign in</Button>
                                    </Col>
                                </Row>
                        </form>
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>
            </div>
        )
    }
}
