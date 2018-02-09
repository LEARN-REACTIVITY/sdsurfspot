import React, { Component } from 'react';
import {Row, Col, Grid, Image, Button} from 'react-bootstrap'


export default class Home extends Component {

    render() {
        return (
            <div className="locations">
            <header className="masthead">
            <h1 className="mainheader">San Diego Surf Spots</h1>
            <h3 className="secondheader">Check out the daily local surf report!</h3>
            </header>
                {this.props.beaches.map(function(element, key) {
                return  <div className= "box">
                        <h4>{element.name}</h4>
                            <a key={key}                            href={`/beaches/${element.id}`}>
                                <Image className="locationImages" src={require("./default.jpg")} rounded />
                                </a>
                            <Button className="checkIn" bsSize="xsmall">Check In</Button>
                        </div>
                })}
            </div>
        )
    }
}
