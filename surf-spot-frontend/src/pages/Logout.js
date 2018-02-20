import React, { Component } from 'react';
import NavBarPages from './NavBarPages';

export default class Logout extends Component {

    handleSubmit() {
        this.props.onSubmit()
    }

    render() {
        return (
            <div>
                <NavBarPages />
                <br />
                <br />
                <br />
                <br />
                <h3> Are you sure you want to leave? </h3>
                <button id="submit" className="btn btn-primary btn-md text-uppercase js-scroll-trigger" onClick={this.handleSubmit.bind(this)}>Log Out</button>
            </div>
        )
    }
}
