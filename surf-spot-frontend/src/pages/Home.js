import React, { Component } from 'react';
// import {ListGroup, ListGroupItem} from 'react-bootstrap'


export default class Home extends Component {

    render() {
        return (
            <div>
                <header className="masthead">
                    <h1 className="mainheader">San Diego Surf Spots</h1>
                    <h3 className="secondheader">Check out the daily local surf report!</h3>
                </header>
                <div>
                {this.props.beaches.map(function(element, key) {
                  return  <a key={key} href={`/beaches/${element.id}`}><li key={key}>
                          <h2> {element.name} </h2>
                          </li></a>
                      })}
                </div>
                <div>
                  <h3 className='about'>About Our Staff</h3>
                  <p>Christina, Leeann, Jordan, Max</p>
                </div>
            </div>
        )
    }
}
