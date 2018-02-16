import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


const backApi =  "http://localhost:3000"

export default class Home extends Component {
    constructor(props){
       super(props)

       this.state = {
            result: {},
            isCheckedIn: false,
            beachCheckedIn: ""

        }
   }

    componentWillMount() {
        const { beaches } = this.props

        this.fetchCheckins(beaches)
        this.checkInState()
    }

    componentWillReceiveProps(props, state) {
        const { beaches } = this.props

        if(beaches.length > 0) {
            this.fetchCheckins(beaches)
        }
    }

    checkInState() {
        if(localStorage.getItem('checkCount') != null) {
            this.setState({isCheckedIn: true})
        }
    }

    fetchCheckins(beaches) {
        if(beaches === undefined || beaches.length <= 0) {
            return
        }

        beaches.map((element, key)=> {
            var token = localStorage.getItem('authToken')
            var id = element.id
            if(true) {
                fetch(`${backApi}/checkin/${id}`, {
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
                        result[id] = metadata.rowCount
                        this.setState({
                            result: result
                        })
                    }
                })
                .catch(e => console.log(e))
            }
        })
    }

    handleCheckIn(beachName, beaches) {
        var token = localStorage.getItem('authToken')
        var countCheck = localStorage.getItem('checkCount')
        const { isCheckedIn } = this.state
        if (token === null) {
            alert("Please sign in or register.")
        } else {
            if(!isCheckedIn) {
                var params = {
                    name: beachName,
                    authToken: token
                }

                fetch(`${backApi}/user_beaches`, {
                    body: JSON.stringify(params),  // <- we need to stringify the json for fetch
                    headers: {  // <- We specify that we're sending JSON, and expect JSON back
                      'Content-Type': 'application/json'
                    },
                    method: "PUT"  // <- Here's our verb, so the correct endpoint is invoked on the server
                }).then(() => {
                    localStorage.setItem('checkCount', true)
                    this.fetchCheckins(beaches)
                    this.setState({
                        isCheckedIn: true,
                        beachCheckedIn: beachName
                    })
                    console.log(this.state.beachCheckedIn)
                })

            } else {
                alert("You're already checked in.")
            }
        }
    }

    handleCheckOut(beachName, beaches) {
        var token = localStorage.getItem('authToken')
        var countCheck = localStorage.getItem('checkCount')
        const { isCheckedIn } = this.state
        if (token === null) {
            alert("Please sign in or register.")
        } else {
            if(isCheckedIn) {
                var params = {
                    name: beachName,
                    authToken: token
                }

                fetch(`${backApi}/user_beaches/checkout`, {
                    body: JSON.stringify(params),  // <- we need to stringify the json for fetch
                    headers: {  // <- We specify that we're sending JSON, and expect JSON back
                      'Content-Type': 'application/json'
                    },
                    method: "PUT"  // <- Here's our verb, so the correct endpoint is invoked on the server
                }).then(() => {
                    this.fetchCheckins(beaches)
                    localStorage.removeItem('checkCount')
                    this.setState({
                        isCheckedIn: false,
                        beachCheckedIn: ""
                    })
                })

            } else {
                alert("You are not checked in.")
            }
        }
    }

    render() {
        let { result } = this.state
        const { beaches } = this.props
         console.log(this.state.isCheckedIn);

        return (
            <div className="locations" id="locations">
                    <header className="masthead">
                    </header>


                        <h3 id="spots" className="secondheader">CHECK OUT THE DAILY LOCAL SURF REPORT!</h3>
                        <div className="whiteboard">
                            {this.props.beaches.map((element, key) => {
                            return  <div className= "cont">
                                    <div className= "box">
                                        <a key={key} href={`/beaches/${element.id}`}>
                                            <h4 className="locationNames">{element.name}</h4>
                                        </a>
                                    </div>
                                    <div>
                                        <h5 className="NumCheckedIn">{result[element.id]}</h5> <p className="TextCheckedIn"> Surfers are checked in right now</p>

                                        {!this.state.isCheckedIn &&
                                        <Button onClick={this.handleCheckIn.bind(this, element.name, this.props.beaches)} className="checkIn" bsSize="xsmall">Check In</Button> }

                                        {this.state.isCheckedIn && (this.state.beachCheckedIn === element.name) &&
                                        <Button onClick={this.handleCheckOut.bind(this, element.name, this.props.beaches)} className="checkIn" bsSize="xsmall">Check Out</Button> }

                                    </div>
                                    </div>
                            })}
                        </div>

            </div>
        )
    }
}
