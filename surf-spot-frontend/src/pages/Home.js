import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import About from './About'
import Footer from './Footer';
import Modal from './Modal'

const backApi =  "http://localhost:3000"

export default class Home extends Component {
    constructor(props){
       super(props)

       this.state = {
            result: {},
            isCheckedIn: false,
            isOpen: false,

        };
   }

   toggleModal = () => {
       this.props.toggle()
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
        if(localStorage.getItem('checkCount') !== null) {
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
                        'Authorization': token,
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
            this.toggleModal()
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
                    localStorage.setItem('beach', beachName)
                    this.fetchCheckins(beaches)
                    this.setState({
                        isCheckedIn: true
                    })
                })

            } else {
                alert("You're already checked in.")
            }
        }
    }

    handleCheckOut(beachName, beaches) {
        var token = localStorage.getItem('authToken')
        var countCheck = localStorage.getItem('checkCount')
        if (token === null) {
            this.toggleModal()
        } else {
            if(countCheck) {
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
                    localStorage.removeItem('beach')
                    this.setState({
                        isCheckedIn: false
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

         var spot = localStorage.getItem('beach')
         var check = localStorage.getItem('checkCount')
        return (
            <div id="top" className="Home">
                <header className="landingPage">
                    <div className="scrollDownButton">
                        <a className="invisButton js-scroll-trigger" href="#About" ></a>
                    </div>
                </header>
                <About />
                <div className="backgroundImageLocations" id="locations">
                    <div className="LocationTitle text-uppercase">Check out the daily local surf report!
                    </div>
                    <div className="container-fluid"><br/><br/>
                        <div className="whiteboard">
                            {this.props.beaches.map((element, key) => {
                            return  <div key={key} className= "cont">
                                        <div className= "box">
                                            <a key={key} href={`beach${element.id}`}>
                                                <h4 className="locationNames text-uppercase">{element.name}</h4>
                                            </a>
                                        </div>
                                        <div id="checkinout">
                                            <h5 className="NumCheckedIn">{result[element.id]}&nbsp;</h5>
                                            <p className="TextCheckedIn"> CHECKED IN</p>
                                            {!this.state.isCheckedIn && (!check) &&
                                            <Button onClick={this.handleCheckIn.bind(this, element.name, this.props.beaches)} className="checkInLoca text-uppercase" bsSize="xs">
                                                Check In
                                            </Button> }
                                            { (spot === element.name ) &&
                                            <Button onClick={this.handleCheckOut.bind(this, element.name, this.props.beaches)} className="checkOutLoca text-uppercase" bsSize="xs">
                                                Check Out
                                            </Button> }
                                        </div>
                                    </div>
                            })}
                        </div>
                        <div
                            className="container-fluid"><br/><br/><br/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
