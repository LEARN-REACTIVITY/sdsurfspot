import React, { Component } from 'react';


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
