import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import Beach from './pages/Beach';

const API = "http://api.spitcast.com/api/county/spots/san-diego/"

class App extends Component {
    constructor(props){
       super(props)

       this.state = {
           beaches:[]
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


  render() {
    return (
      <Router>
        <div>
            <NavBar />
            <div className="App">
              <Route exact path="/" render={props => (
                  <Home beaches={this.state.beaches} />
              )}/>
              <Route path="/beaches/:id" component={Beach} />

            </div>
        </div>
      </Router>
    );
  }
}

export default App;
