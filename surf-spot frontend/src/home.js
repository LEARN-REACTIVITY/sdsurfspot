import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'
// import "./images/LandingPage.jpg";

export default class Home extends Component {

    render() {
        return (
            <div>
                <header className="masthead">
                    <h1>SurfSpot</h1>
                </header>
                <div>
                {this.props.beaches.map(function(element, key) {
                  return  <a key={key} href={`/beaches/${element.id}`}><ListGroupItem key={key}>
                          <h2> {element.name} </h2>
                          </ListGroupItem></a>
                      })}
                </div>
            </div>
        )
    }
}
