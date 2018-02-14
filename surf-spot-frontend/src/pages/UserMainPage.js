import React, { Component } from 'react';
import NavBar from './NavBar.js'; 
import Footer from './Footer'; 
import 'react-bootstrap';
import Form from './Form';

export default class UserMainPage extends Component { 
 render(){   
  return(  
   function(getState) {
        return({  
            name:null,
            userName:null,
            email:null
        })  
    }
    
    componentDidMount() {
        return(
            <div className = 'profile'>           
                <main>
                    <header rclassName='App-header'>
                        <p>hi</p> 
                    </header>    
                    <body className = 'info'>
                        <img src='/../public/imeges.profile.jpg' className="pic" alt="Users Profile pic goes here" />
                        <h3>Name: {this.state.name}</h3>
                        <h3>Email: {this.state.email}</h3>
                        <h3>UserName: {this.state.username}</h3>
                    </body>
                </main>           
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        )
    }
  )   
 }
}

export defualt UserMainPage;

