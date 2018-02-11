import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class CheckInCount extends Component {
    render() {
        const { checkedIn } = this.props

        return (
            <div className= "Count">
                <p>{checkedIn} surfers checked in today</p>
            </div>
        );
    }
}
