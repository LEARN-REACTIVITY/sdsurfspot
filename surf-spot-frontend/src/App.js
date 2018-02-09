import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Beach from './pages/Beach';
import Form from './pages/Form';

const API = "http://api.spitcast.com/api/county/spots/san-diego/"
const backApi =  "http://localhost:3000"

class App extends Component {
    constructor(props){
       super(props)

       this.state = {
           beaches:[],
           newUserSuccess: false,
           errors: null
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
                }
            }).catch(function() {
                console.log('could not save new user')
            })
    }

  render() {
    return (
      <Router>
        <div className="App">
            <div>
              <Route exact path="/" render={props => (
                  <Home beaches={this.state.beaches} />
              )}/>
              <Route path="/beaches/:id" component={Beach} />
              <Route path="/form" render={props => (
                  <div>
                      <Form
                        submitHandler={this.handleNewUser.bind(this)}
                        errors={this.state.errors && this.state.errors.validations}
                      />
                      {this.state.newUserSuccess &&
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
