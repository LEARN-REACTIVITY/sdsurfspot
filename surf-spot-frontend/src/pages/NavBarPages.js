import React, { Component } from 'react';

export default class NavBarPages extends Component {


render() {
		return(
            <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
							<div id="dropDownCont" className="container">
                <a href="/">
									<img className="logoNavBar" src={ require('../images/LogoNavBar.png') } />
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
				                <a className="dropdown-item" href="/beaches/238">Oceanside Harbor</a>
				                <a className="dropdown-item" href="/beaches/594">Oceanside Pier</a>
				                <a className="dropdown-item" href="/beaches/628">Wisconsin</a>
				                <a className="dropdown-item" href="/beaches/629">Cassidy</a>
				                <a className="dropdown-item" href="/beaches/237">Tamarack</a>
												<a className="dropdown-item" href="/beaches/596">Warm Water Yetty</a>
												<a className="dropdown-item" href="/beaches/597">Terra Mar</a>
												<a className="dropdown-item" href="/beaches/630">Campground</a>
												<a className="dropdown-item" href="/beaches/236">Ponto</a>
												<a className="dropdown-item" href="/beaches/400">Grandview</a>
												<a className="dropdown-item" href="/beaches/235">Beacons</a>
												<a className="dropdown-item" href="/beaches/401">D Street</a>
												<a className="dropdown-item" href="/beaches/234">Swamis</a>
												<a className="dropdown-item" href="/beaches/232">Cardiff Reef</a>
												<a className="dropdown-item" href="/beaches/230">15th Street - Del Mar</a>
												<a className="dropdown-item" href="/beaches/754">Torrey Pines State Beach</a>
												<a className="dropdown-item" href="/beaches/229">Blacks Beach</a>
												<a className="dropdown-item" href="/beaches/228">Scripps Pier</a>
												<a className="dropdown-item" href="/beaches/227">Windansea</a>
												<a className="dropdown-item" href="/beaches/398">Bird Rock</a>
												<a className="dropdown-item" href="/beaches/399">Tourmaline</a>
												<a className="dropdown-item" href="/beaches/226">Pacific Beach</a>
												<a className="dropdown-item" href="/beaches/397">Mission Beach</a>
												<a className="dropdown-item" href="/beaches/225">Ocean Beach Pier</a>
												<a className="dropdown-item" href="/beaches/224">Sunset Cliffs</a>
												<a className="dropdown-item" href="/beaches/223">Imperial Beach</a>
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
													<a className="nav-link" href='/logout'>Sign Out</a>
												</li>
											</ul>
										}
                </div>
								</div>
            </nav>
        );
    }
}
