import React, { Component } from 'react';
import NavBarPages from './NavBarPages';


export default class Hello extends Component {

    render() {
        return (
            <div>
            <NavBarPages isLoggedIn={this.state.isLoggedIn}/>
                <br />
                <br />
                <h3> Welcome Back! </h3>

            </div>
        )
    }
}
