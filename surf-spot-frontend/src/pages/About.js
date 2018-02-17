import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export default class About extends Component {


render() {
		return (
			<div className="About" id="About">
				<h2 className="TitleAbout">CHECK OUT THE DAILY LOCAL SURF REPORT!</h2>
                <p className="TextAbout">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repreh.
                </p>
				<Button id="submit" className="btn btn-primary" href='/form' onClick='./Form'>Sign Up Now</Button>
			</div>
		);
	}
}
