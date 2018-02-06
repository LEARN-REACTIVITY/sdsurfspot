import React, { Component } from 'react';
import App from './App'

export default class Home extends Component {
    constructor(props){
       super(props)
       this.state = {
           beaches:[]
       }
   }


    render() {
        return (
            <div>
                <p>{this.state.beaches.name}</p>
            </div>
        )
    }
}
