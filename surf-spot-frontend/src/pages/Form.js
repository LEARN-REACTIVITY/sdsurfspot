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

export default class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            form:{
                name: " ",
                username: " ",
                password: " ",
                email: " "
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
                <h1 className="form-sign"> Sign up! </h1>
                <Row>
                    <Col md={4}>
                    </Col>
                    <Col md={4}>
                        <form>
                                <Row>
                                    <Col xs={6}>
                                        {this.props.errors &&
                                            <Alert bsStyle="danger">
                                                Please check form and try again.
                                            </Alert>
                                        }
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
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
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                        <Button id="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)} >Make an Account</Button>
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
