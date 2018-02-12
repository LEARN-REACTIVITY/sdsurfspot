import React, { Component } from 'react';


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
                  <h3 className='about'>About</h3>
                  <p>Christina, Leeann, Jordan, Max</p>
                </div>
                <div>
                    <h3 className='Credits'>Credits</h3>
                    <p>all the shoutout goes out to our team</p>
                </div>
            </div>
            
        )
    }
}
