import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


const backApi =  "http://localhost:3000"

export default class Home extends Component {
    constructor(props){
       super(props)

       this.state = {
            result: {}
        }
   }

    componentWillMount() {
        this.fetchCheckins()
    }

    fetchCheckins() {
        for(var x=1; x <= 26; x++) {
            var token = localStorage.getItem('authToken')

            if(true) {
                fetch(`${backApi}/checkin/${x}`, {
                    method: 'GET',  // <- Here's our verb, so the correct endpoint is invoked on the server
                    headers: {  // <- We specify that we're sending JSON, and expect JSON back
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                })
                .then((raw) => raw.json())
                .then((res) => {
                    const { errors, metadata } = res
                    let { result } = this.state

                    if(errors != undefined) {
                        this.setState({
                            errors: errors,
                        })
                    } else {
                        result[x] = metadata.rowCount

                        this.setState({
                            result: result
                        })
                    }
                })
                .catch(e => console.log(e))
            }
        }

    }

    handleCheckIn(beach, key) {
        var token = localStorage.getItem('authToken')
        var countCheck = localStorage.getItem('checkCount')
        if (token === null) {
            alert("Please sign in or register.")
        } else {
            if(countCheck === null) {
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
                // this.state.checkedInCount[key] = {count: this.state.checkedInCount[key].count +1}
                // this.setState({
                //     checkedInCount: this.state.checkedInCount
                // })
                localStorage.setItem('checkCount', true)

            } else {
                alert("You're already checked in.")
            }
        }
    }

    clickHandler() {
         this.setState({
             checkedInCount: this.state.checkedInCount +1
         });
     }

    render() {
        let { result } = this.state
        const { beaches } = this.props

        return (
            <div className="locations" id="locations">
                    <header className="masthead">
                    </header>
                    <div id="spots" className="whiteboard">
                    <h3 className="secondheader">CHECK OUT THE DAILY LOCAL SURF REPORT!</h3>
                        {beaches.map((element, key) => {
                            return  (<div key={element.name} className= "box">
                                        <a href={`/beaches/${element.id}`}>
                                            <h4 className="locationNames">{element.name}</h4>
                                        </a>

                                        <Button onClick={this.handleCheckIn.bind(this, element.name, key)} className="checkIn" bsSize="xsmall">Check In</Button>
                                        <p className="checkedIn">{result[key]} Surfers are checked in today</p>
                                    </div>)
                        })}
                    </div>
            </div>
        )
    }
}
