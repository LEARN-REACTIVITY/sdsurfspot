import React, { Component } from 'react';
import LogOutModal from './LogOutModal';

export default class NavBarPages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false
		}
	}

	handleSubmit() {
        this.props.onSubmit()
    }

	toggleModal = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	 }

render() {
	var token = localStorage.getItem('authToken')
		return(
            <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
							<div id="dropDownCont" className="container">
                <a href="/">
									<img className="logoNavBar" src={ require('../images/LogoNavBar_LG.png') } />
								</a>
								<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				          Menu
				          <i className="fa fa-bars"></i>
				        </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav text-uppercase mr-auto">
										<li className="nav-item dropdown">
				              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBeaches" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">List of Beaches</a>
				              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
				                <a className="dropdown-item" href="/beach238">Oceanside Harbor</a>
				                <a className="dropdown-item" href="/beach594">Oceanside Pier</a>
				                <a className="dropdown-item" href="/beach628">Wisconsin</a>
				                <a className="dropdown-item" href="/beach629">Cassidy</a>
				                <a className="dropdown-item" href="/beach237">Tamarack</a>
								<a className="dropdown-item" href="/beach596">Warm Water Yetty</a>
								<a className="dropdown-item" href="/beach597">Terra Mar</a>
								<a className="dropdown-item" href="/beach630">Campground</a>
								<a className="dropdown-item" href="/beach236">Ponto</a>
								<a className="dropdown-item" href="/beach400">Grandview</a>
								<a className="dropdown-item" href="/beach235">Beacons</a>
								<a className="dropdown-item" href="/beach401">D Street</a>
								<a className="dropdown-item" href="/beach234">Swamis</a>
								<a className="dropdown-item" href="/beach232">Cardiff Reef</a>
								<a className="dropdown-item" href="/beach230">15th Street - Del Mar</a>
								<a className="dropdown-item" href="/beach754">Torrey Pines State Beach</a>
								<a className="dropdown-item" href="/beach229">Blacks Beach</a>
								<a className="dropdown-item" href="/beach228">Scripps Pier</a>
								<a className="dropdown-item" href="/beach227">Windansea</a>
								<a className="dropdown-item" href="/beach398">Bird Rock</a>
								<a className="dropdown-item" href="/beach399">Tourmaline</a>
								<a className="dropdown-item" href="/beach226">Pacific Beach</a>
								<a className="dropdown-item" href="/beach397">Mission Beach</a>
								<a className="dropdown-item" href="/beach225">Ocean Beach Pier</a>
								<a className="dropdown-item" href="/beach224">Sunset Cliffs</a>
								<a className="dropdown-item" href="/beach223">Imperial Beach</a>
				              </div>
				            </li>
                    </ul>
						{!this.props.isLoggedIn &&
		                    <ul className="navbar-nav text-uppercase ml-auto">
			                    <li className="nav-item">
			                      <a className="nav-link" href='./form'>Sign Up</a>
			                    </li>
			                    <li className="nav-item">
			                      <a className="nav-link" href='./signin'>Log In</a>
			                    </li>
		                    </ul>
						}
						{this.props.isLoggedIn &&
							<ul className="navbar-nav text-uppercase ml-auto">
								<li className="nav-item">
									<a className="nav-link" onClick={this.toggleModal.bind(this)}>Log Out</a>
								</li>
							</ul>
						}
                	</div>
				</div>
				{this.state.isOpen &&
					<div>
					<LogOutModal
						onClose={this.toggleModal.bind(this)}
						logOut={this.handleSubmit.bind(this)}
					/>
					</div>
				}
            </nav>
        );
    }
}
