import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Beach from './pages/Beach';
import Form from './pages/Form';
import NavBar from './pages/NavBar';
import SignIn from './pages/SignIn';

const API = "http://api.spitcast.com/api/county/spots/san-diego/"
const backApi =  "http://localhost:3000"

class App extends Component {
    constructor(props){
       super(props)

       this.state = {
           beaches:[],
           user: [],
           newUserSuccess: false,
           errors: null,
           existingUserSuccess: false,
       }
   }

    componentWillMount() {
        fetch(API).then((resp) => {
                return resp.json()
            }).then((beaches) => {
                console.log(beaches)
                    var beachname = []
                    beaches.forEach((beach)=>{
                        beachname.push({
                          id: beach.spot_id,
                          name: beach.spot_name
                        })
                    })
                    this.setState({beaches: beachname})
                    console.log(this.state.beaches)
                }
            )}

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
                        newUserSuccess: true // <- This is the new flag in state
                      })
                      console.log(this.state.user)
                }
            }).catch(function() {
                console.log('could not save new user')
            })
    }

    handleExistingUser(params) {
        fetch(`${backApi}/users`,
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
                        newExistingSuccess: true // <- This is the new flag in state
                      })
                      console.log(this.state.user)
                }
            }).catch(function() {
                console.log('could not save new user')
            })
    }


  render() {
    return (
      <Router>
        <div className="App">
            <NavBar beaches={this.state.beaches} />
              <Route exact path="/" render={props => (
                  <Home beaches={this.state.beaches} />
              )}/>
              <div className="container-fluid">
              <br />
              <br />
              <Route path="/beaches/:id" component={Beach} />
              <Route path="/form" render={props => (
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

              <Route path="/signin" render={props => (
                  <div>
                      <SignIn
                        onSubmit={this.handleExistingUser.bind(this)}
                        errors={this.state.errors && (this.state.errors.validations || this.state.errors.serverValidations)}
                      />
                      {this.state.existingUserSuccess &&
                        <Redirect to="/" />
                      }
                  </div>
              )} />
            </div>
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
