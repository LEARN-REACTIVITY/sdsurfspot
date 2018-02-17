import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

import '../App.css'


export default class NavBar extends Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect className="Navigation">
              <Navbar.Header >
                <Navbar.Brand>
                  <a href="/">SD Surf Spots</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1}  href="#About">Whats good?!</NavItem>
                  <NavItem eventKey={2}  href="#locations">Surf Locations</NavItem>
                  <NavDropdown eventKey={3} title="List of All" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} href="/beaches/238"> Oceanside Harbor</MenuItem>
                    <MenuItem eventKey={3.2} href="/beaches/594"> Oceanside Pier</MenuItem>
                    <MenuItem eventKey={3.3} href="/beaches/628">Wisconsin</MenuItem>
                    <MenuItem eventKey={3.4} href="/beaches/629">Cassidy</MenuItem>
                    <MenuItem eventKey={3.5} href="/beaches/237">Tamarack</MenuItem>
                    <MenuItem eventKey={3.6} href="/beaches/596">Warm Water Yetty</MenuItem>
                    <MenuItem eventKey={3.7} href="/beaches/597">Terra Mar</MenuItem>
                    <MenuItem eventKey={3.8} href="/beaches/630">Campground</MenuItem>
                    <MenuItem eventKey={3.9} href="/beaches/236">Ponto</MenuItem>
                    <MenuItem eventKey={3.10} href="/beaches/400">Grandview</MenuItem>
                    <MenuItem eventKey={3.11} href="/beaches/235">Beacons</MenuItem>
                    <MenuItem eventKey={3.12} href="/beaches/401">D Street</MenuItem>
                    <MenuItem eventKey={3.13} href="/beaches/234">Swamis</MenuItem>
                    <MenuItem eventKey={3.14} href="/beaches/232">Cardiff Reef</MenuItem>
                    <MenuItem eventKey={3.15} href="/beaches/230">15th Street - Del Mar</MenuItem>
                    <MenuItem eventKey={3.16} href="/beaches/754">Torrey Pines State Beach</MenuItem>
                    <MenuItem eventKey={3.17} href="/beaches/229">Blacks Beach</MenuItem>
                    <MenuItem eventKey={3.18} href="/beaches/228">Scripps Pier</MenuItem>
                    <MenuItem eventKey={3.19} href="/beaches/227">Windansea</MenuItem>
                    <MenuItem eventKey={3.20} href="/beaches/398">Bird Rock</MenuItem>
                    <MenuItem eventKey={3.21} href="/beaches/399">Tourmaline</MenuItem>
                    <MenuItem eventKey={3.22} href="/beaches/226">Pacific Beach</MenuItem>
                    <MenuItem eventKey={3.23} href="/beaches/397">Mission Beach</MenuItem>
                    <MenuItem eventKey={3.24} href="/beaches/225">Ocean Beach Pier</MenuItem>
                    <MenuItem eventKey={3.25} href="/beaches/224">Sunset Cliffs</MenuItem>
                    <MenuItem eventKey={3.26} href="/beaches/223">Imperial Beach</MenuItem>
                  </NavDropdown>
                </Nav>
                <Nav pullRight>
                    {!this.props.isLoggedIn &&
                        <Nav pullRight>
                          <NavItem eventKey={1} href='/form' >
                            Sign Up
                          </NavItem>
                          <NavItem eventKey={2} href="/signin">
                            Sign In
                          </NavItem>
                        </Nav>
                    }

                  {this.props.isLoggedIn && <NavItem eventKey={3} href="/logout">
                    Sign Out
                  </NavItem>}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}
