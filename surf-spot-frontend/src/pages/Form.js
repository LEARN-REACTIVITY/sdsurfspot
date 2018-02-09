import React, { Component } from 'react';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Row,
    Button
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

    render() {
        return(
            <form>

                <Row>
                    <Col>
                        <FormGroup>
                            <ControlLabel id="name">Name</ControlLabel>
                            <FormControl
                                type="text"
                                name="name"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.form.name}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <ControlLabel id="username">Username</ControlLabel>
                            <FormControl
                                type="text"
                                name="username"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.form.username}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <ControlLabel id="password">Password</ControlLabel>
                            <FormControl
                                type="text"
                                name="password"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.form.password}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <ControlLabel id="email">Email</ControlLabel>
                            <FormControl
                                type="text"
                                name="email"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.form.email}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button id="submit" >Make an Account</Button>
                    </Col>
                </Row>

            </form>
        )
    }
}
