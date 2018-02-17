import React, { Component } from 'react';

export default class NavBarNew extends Component {


render() {
		return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                  <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="/">San Diego Surf Spots</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                      Menu
                      <i className="fa fa-bars"></i>
                    </button>
                    <div id="navbarResponsive">
                    <div className="navbarLeft">
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item">
                          <a className="nav-link js-scroll-trigger" href="#About">Whats Good?!</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link js-scroll-trigger" href="#locations">Surf Locations</a>
                        </li>
                        <li className="nav-item" id="basic-nav-dropdown">
                            <li href="/beaches/238">Oceanside Harbor</li>
                          <a className="nav-link js-scroll-trigger">List of All</a>
                        </li>
                        </ul>
                        </div>
                        <div className="navbarRight">
                        <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item">
                          <a className="nav-link js-scroll-trigger" href='./form'>Sign Up</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link js-scroll-trigger" href='./signin'>Log In</a>
                        </li>
                        </ul>
                        </div>
                        </div>
                    </div>
                  </div>
                </nav>
            </div>
        );
    }
}
