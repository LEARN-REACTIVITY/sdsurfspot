import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { HashLink as Link } from 'react-router-hash-link';
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
                  <NavItem eventKey={1}  href="#spots">Surf Locations</NavItem>
                  <NavDropdown eventKey={2} title="List of All" id="basic-nav-dropdown">
                    <MenuItem eventKey={2.1} href="/beaches/238"> Oceanside Harbor</MenuItem>
                    <MenuItem eventKey={2.2} href="/beaches/594"> Oceanside Pier</MenuItem>
                    <MenuItem eventKey={2.3} href="/beaches/628">Wisconsin</MenuItem>
                    <MenuItem eventKey={2.4} href="/beaches/629">Cassidy</MenuItem>
                    <MenuItem eventKey={2.5} href="/beaches/237">Tamarack</MenuItem>
                    <MenuItem eventKey={2.6} href="/beaches/596">Warm Water Yetty</MenuItem>
                    <MenuItem eventKey={2.7} href="/beaches/597">Terra Mar</MenuItem>
                    <MenuItem eventKey={2.8} href="/beaches/630">Campground</MenuItem>
                    <MenuItem eventKey={2.9} href="/beaches/236">Ponto</MenuItem>
                    <MenuItem eventKey={2.10} href="/beaches/400">Grandview</MenuItem>
                    <MenuItem eventKey={2.11} href="/beaches/235">Beacons</MenuItem>
                    <MenuItem eventKey={2.12} href="/beaches/401">D Street</MenuItem>
                    <MenuItem eventKey={2.13} href="/beaches/234">Swamis</MenuItem>
                    <MenuItem eventKey={2.14} href="/beaches/232">Cardiff Reef</MenuItem>
                    <MenuItem eventKey={2.15} href="/beaches/230">15th Street - Del Mar</MenuItem>
                    <MenuItem eventKey={2.16} href="/beaches/754">Torrey Pines State Beach</MenuItem>
                    <MenuItem eventKey={2.17} href="/beaches/229">Blacks Beach</MenuItem>
                    <MenuItem eventKey={2.18} href="/beaches/228">Scripps Pier</MenuItem>
                    <MenuItem eventKey={2.19} href="/beaches/227">Windansea</MenuItem>
                    <MenuItem eventKey={2.20} href="/beaches/398">Bird Rock</MenuItem>
                    <MenuItem eventKey={2.21} href="/beaches/399">Tourmaline</MenuItem>
                    <MenuItem eventKey={2.22} href="/beaches/226">Pacific Beach</MenuItem>
                    <MenuItem eventKey={2.23} href="/beaches/397">Mission Beach</MenuItem>
                    <MenuItem eventKey={2.24} href="/beaches/225">Ocean Beach Pier</MenuItem>
                    <MenuItem eventKey={2.25} href="/beaches/224">Sunset Cliffs</MenuItem>
                    <MenuItem eventKey={2.26} href="/beaches/223">Imperial Beach</MenuItem>
                  </NavDropdown>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={1} href='/form' >
                    Sign Up
                  </NavItem>
                  <NavItem eventKey={2} href='/signin'>
                    Sign In
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}
