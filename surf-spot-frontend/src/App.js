import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Beach from './pages/Beach';
import Form from './pages/Form';
import SignIn from './pages/SignIn';
import Logout from './pages/Logout';
import Hello from './pages/Hello';
import NavBarPages from './pages/NavBarPages';

const API = "http://api.spitcast.com/api/county/spots/san-diego/"
const backApi =  "http://localhost:3000"

class App extends Component {
    constructor(props){
       super(props)

       this.state = {
           beaches:[],
           user: [],
           newUserSuccess: false,
           logInSuccess: false,
           errors: null,
           isLoggedIn: false,
           logOutSuccess: false,
           modalSuccess: false
       }
   }

   modalSuccess() {
     this.setState({
       modalSuccess: true
     })
   }

   loggedIn() {
       if(localStorage.getItem('authToken') != null) {
           this.setState({isLoggedIn: true})
       }
   }

   logOut() {
       localStorage.removeItem('authToken')
       localStorage.removeItem('checkCount')
       localStorage.removeItem('beach')
       this.setState({isLoggedIn: false, logOutSuccess: true})
   }

    componentWillMount() {
        fetch(API).then((resp) => {
                return resp.json()
            }).then((beaches) => {
                    var beachname = []
                    beaches.forEach((beach)=>{
                        beachname.push({
                          id: beach.spot_id,
                          name: beach.spot_name
                        })
                    })
                    this.setState({beaches: beachname})
                    console.log(this.state.beaches);
                }).then(() => {
                    if(localStorage.getItem('authToken') != null) {
                        this.setState({isLoggedIn: true})
                        this.loggedIn()
                    } else {
                        this.setState({isLoggedIn: false})
                    }
                })
            }

    handleNewUser(params){
        fetch(`${backApi}/users`,
            {
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST"
            }).then((rawResponse) => {
                return rawResponse.json()
            }).then((parsedResponse) => {
                if(parsedResponse.errors){
                    this.setState({errors: parsedResponse.errors})
                    console.log(this.state.errors)
                } else {
                    const user = Object.assign([], this.state.user)
                    user.push(parsedResponse.user)
                    this.setState({
                        user: user,  // <- Update cats in state
                        errors: null, // <- Clear out any errors if they exist
                        newUserSuccess: true, // <- This is the new flag in state
                        isLoggedIn: true //logged in
                      })
                      console.log(this.state.user)
                      localStorage.setItem('authToken', this.state.user[0].authToken)
                }
            }).catch(function() {
                console.log('could not save new user')
            })
    }

    handleExistingUser(params) {
        fetch(`${backApi}/login`,
            {
                body:JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST"
            }).then((rawResponse) => {
                return rawResponse.json()
            }).then((parsedResponse) => {
                if(parsedResponse.errors){
                    this.setState({errors: parsedResponse.errors})
                    console.log(this.state.errors)
                } else {
                    const user = Object.assign([], this.state.user)
                    user.push(parsedResponse.user)
                    this.setState({
                        user: user,  // <- Update users in state
                        errors: null, // <- Clear out any errors if they exist
                        logInSuccess: true, // <- This is the new flag in state
                        isLoggedIn: true
                      })
                      console.log(this.state.user)
                      localStorage.setItem('authToken', this.state.user[0].authToken)

                      if(parsedResponse.beach) {
                          var spot = parsedResponse.beach.name
                          console.log('spot: ' + spot)
                          localStorage.setItem('beach', spot)
                          localStorage.setItem('checkCount', true)
                      }
                }
            }).catch(function() {
                console.log('could not save new user')
            })
    }





  render() {
    return (
      <Router>
        <div className="App">

            {/* <NavBar isLoggedIn={this.state.isLoggedIn}/> */}

              <Route exact path="/" render={props => (
                  <div>
                    <Home beaches={this.state.beaches} user={this.state.user} modalSuccess={this.state.modalSuccess}
                    />
                    {this.state.modalSuccess &&
                      <Redirect to='/signin'/>
                    }
                  </div>
              )}/>
              <Route path="/beach:id" render={props => (
                  <div>
                    <NavBarPages />
                    <Beach {...props} />
                  </div>
              )} />
              <Route exact path="/form" render={props => (
                  <div>
                      <Form
                        onSubmit={this.handleNewUser.bind(this)}
                        errors={this.state.errors && (this.state.errors.validations || this.state.errors.serverValidations)}
                      />
                      {this.state.newUserSuccess &&
                        <Redirect to="/" />
                      }
                  </div>
              )} />

              <Route exact path="/signin" render={props => (
                  <div className="SignIn">
                      <SignIn
                        onSubmit={this.handleExistingUser.bind(this)}
                        errors={this.state.errors && (this.state.errors.validations || this.state.errors.serverValidations)}
                      />
                      {this.state.logInSuccess &&
                        <Redirect to="/" />
                      }
                  </div>
              )} />
              <Route exact path="/logout" render={props => (
                  <div>
                        <Logout
                            onSubmit={this.logOut.bind(this)}
                        />
                        {this.state.logOutSuccess &&
                          <Redirect to="/" />
                        }
                  </div>
              )} />

        </div>
      </Router>
    );
  }
}

export default App;



//if(user_beaches.check_in && !user_beaches.check_out){
//     user is checked in
// } else if( user_beaches.check_in === true && user.beaches.check_out === true){
//     user is checked out
// } else{
//     user is checked out
// }
