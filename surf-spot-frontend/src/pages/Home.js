import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Row, Col, Grid, Image, Button} from 'react-bootstrap';
import CheckInCount from './CheckInCount.js';
import NavBar from './NavBar.js';


export default class Home extends Component {
    constructor(props){
       super(props);

       this.state = {
           checkedInCount: 0
       };
   }

  clickHandler() {
      this.setState({
          checkedInCount: this.state.checkedInCount +1
      });
  }

    render() {
        return (
            <div className="locations" id="locations">
            <header className="masthead">
            </header>
            <h3 id='spots' className="secondheader">Check out the daily local surf report!</h3>
                {this.props.beaches.map((element, key) => {
                return  <div className= "box">
                            <a key={key} href={`/beaches/${element.id}`}>
                                <h4 className="locationNames">{element.name}</h4>
                            </a>
                            <Button onClick={this.clickHandler.bind(this)} className="checkIn" bsSize="xsmall">Check In</Button>
                            <p className="checkedIn">{this.state.checkedInCount} Surfers are checked in today</p>
                        </div>
                })}

                <div>
                  <h3 className='about'>About Our Staff</h3>
                  <p>Christina, Leeann, Jordan, Max</p>
                </div>

            </div>
        )
    }
}
