import React, { Component } from 'react';
// import {ListGroup, ListGroupItem} from 'react-bootstrap'
import "./App.css";


export default class Home extends Component {

    render() {
        return (
            <div>
                <header className="masthead text-center text-white d-flex">
                    <h1>SurfSpots</h1>
                </header>
                <div>
                {this.props.beaches.map(function(element, key) {
                  return  <a key={key} href={`/beaches/${element.id}`}><li key={key}>
                          <h2> {element.name} </h2>
                          </li></a>
                      })}
                </div>
            </div>
        )
    }
}
