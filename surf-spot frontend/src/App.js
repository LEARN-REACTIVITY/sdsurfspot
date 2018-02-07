import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const AppBarExampleIcon = () => (
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

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
                        beachname.push(beach.spot_name)
                        console.log(beach.spot_name)
                    })
                    this.setState({beaches: beachname})
                    console.log(beachname)
                }
            )}


  render() {
    return (
      <div className="App">
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

        <div>
            {this.state.beaches.map(function(element, key) {
                return <Card key={key}>
                  <CardTitle title={element} subtitle="Card subtitle" />
                </Card>
            })}
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
