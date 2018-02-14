import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


const backApi =  "http://localhost:3000"




export default class Home extends Component {
    constructor(props){
       super(props)
       this.state = {
            checkedInCount: 0
        };
   }
   //
   // handleCheckIn(params) {
   //     const id = this.props.match.params.id
   //     fetch(`${backApi}/user_beaches/${id}`,
   //         {
   //             body:JSON.stringify(params),
   //             headers: {
   //                 'Content-Type': 'application/json'
   //             },
   //             method: "PUT"
   //         })
   // }

    handleCheckIn(beach) {
        var token = localStorage.getItem('authToken')
        var params = {
            name: beach,
            authToken: token
        }

        fetch(`${backApi}/user_beaches`, {
            body: JSON.stringify(params),  // <- we need to stringify the json for fetch
            headers: {  // <- We specify that we're sending JSON, and expect JSON back
              'Content-Type': 'application/json'
            },
            method: "PUT"  // <- Here's our verb, so the correct endpoint is invoked on the server
        })
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
            <h3 id='spots' className="secondheader">CHECK OUT THE DAILY LOCAL SURF REPORT!</h3>
                {this.props.beaches.map((element, key) => {
                return  <div className= "box">
                            <img src={require("../images/surfboard.jpg")} />
                            <a key={key} href={`/beaches/${element.id}`}>
                                <h4 className="locationNames">{element.name}</h4>
                            </a>

                            <Button onClick={this.handleCheckIn.bind(this, element.name)} className="checkIn" bsSize="xsmall">Check In</Button>
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
