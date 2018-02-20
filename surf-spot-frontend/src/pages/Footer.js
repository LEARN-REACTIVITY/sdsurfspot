import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<div className="Footer" id="Footer">
			<img className="logoNavBar" src={ require('../images/LogoNavBar.png') } />
                <p className="TextFooter">
                    &copy; Reactivity 2018<br/>
										reactivity@gmail.com<br/>
                    Information pulled from Spitcast and spitcast.com
                </p>
			</div>
		);
	}
}
