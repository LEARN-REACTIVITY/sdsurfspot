import React, { Component } from 'react';

export default class About extends Component {


render() {
		return (
			<div id="About">
			<div className="About">
				<h2 className="TitleAbout text-uppercase">Welcome to AKAW<br/>San Diego's Surf Spot Locator!</h2>
		<div className="TextAboutComb">
	        <p className="TextAbout">At</p><p className="TextAboutBold">&nbsp;AKAW</p> <p className="TextAbout">&nbsp;you can check in and see the surf report and what's good at your favorite spot to avoid drop ins. Here we allow surfers to check in to each location to show how crowded each spot is.
	        </p>
		</div>
				<a id="signUpButton" className="btn btn-primary btn-lg text-uppercase js-scroll-trigger" href='/Form'>Sign Up Now</a>
			</div>
			</div>
		);
	}
}
