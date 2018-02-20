import React, { Component } from 'react';

export default class About extends Component {


render() {
		return (
			<div className="About" id="About">
				<h2 className="TitleAbout">CHECK OUT THE DAILY LOCAL SURF REPORT!</h2>
                <p className="TextAbout">Welcome to AKAW, San Diego's surf spot locator. Here you can check in and see the surf report and what's good at your favorite spot to avoid drop ins. Here at AKAW we allow surfers to check in to each location to show how crowded each spot is. 
                </p>
				<a id="signUpButton" className="btn btn-primary btn-lg text-uppercase js-scroll-trigger" href='/Form'>Sign Up Now</a>
			</div>
		);
	}
}
