import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Beach from './Beach';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
        <div className="App">
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
              <Route exact path="/" render={props => (
                  <Home beaches={this.state.beaches} />
              )}/>
              <Route path="/beaches/:id" component={Beach} />

            </div>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

export default App;
