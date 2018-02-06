import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home';

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
                        // beachname.push({
                        //     name: beaches.county,
                        // })
                    })
                    this.setState({beaches: beachname})
                    console.log(beachname)
                }
            )}


  render() {
    return (
      <div className="App">
        <div>
            {this.state.beaches.map(function(element, key) {
                return <p key={key}>{element}</p>
            })}
        </div>
      </div>
    );
  }
}

export default App;
