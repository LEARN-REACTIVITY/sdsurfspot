import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<div className="Footer" id="Footer">
				<h2 className="TitleFooter">AKAW</h2>
                <p className="TextFooter">
                    reactivity@gmail.com<br/>
                    &copy;<br/>
                    API and swell information pulled from Spitcast and spitcast.com
                </p>
			</div>
		);
	}
}
