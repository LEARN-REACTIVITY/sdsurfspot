import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export default class Logout extends Component {

    handleSubmit() {
        this.props.onSubmit()
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <h3> Are you sure you want to leave? </h3>
                <Button id="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Sign Out</Button>
            </div>
        )
    }
}
