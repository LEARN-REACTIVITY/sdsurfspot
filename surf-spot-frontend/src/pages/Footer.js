import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<div className="Footer" id="Footer">
				<div className="logoFooter">
				<img className="LogoFo" src={ require('../images/LogoNavBar_LG.png') } />
			</div>
			<div className="TextFo">
                <p className="TextFooter">
                    &copy; Reactivity 2018&nbsp;  |&nbsp;  reactivity@gmail.com&nbsp;  |&nbsp;  Information pulled from Spitcast and spitcast.com
                </p>
								</div>
			</div>
		);
	}
}
