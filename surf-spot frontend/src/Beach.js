import React, { Component } from 'react';


const proxyurl = "https://cors-anywhere.herokuapp.com/" //proxy url to bypass cross origin error
const API = "http://api.spitcast.com/api/spot/forecast"

export default class Beach extends Component {
    constructor(props){
       super(props)
       this.state = {
           beach:[]
       }
   }

   componentWillMount(){
       const id = this.props.match.params.id
       fetch(`${proxyurl}${API}/${id}`)
       .then((resp) => {
           return resp.json()
       })
       .then((beach)=>{
         console.log(beach)
             var date = new Date ();
             var hour = date.getHours()
             var spot = beach[hour] // getting beach information depending on what hour it is
             var beachinfo = {
                   id: spot.spot_id,
                   name: spot.spot_name,
                   date: spot.date,
                   hour: spot.hour,
                   swell: spot.shape_detail.swell,
                   tide: spot.shape_detail.tide,
                   wind: spot.shape_detail.wind,
                   size: spot.size_ft
                 }
             this.setState({beach: beachinfo})
             console.log(this.state.beach)

       }).catch((err) => {
         console.log("cannot fetch api")
       })
   }

    render() {
        return (
            <div>
                <h1>{this.state.beach.name}</h1>
                    <p> Date: {this.state.beach.date} </p>
                    <p> Time of report: {this.state.beach.hour} </p>
                    <h3>Swell Details</h3>
                    <h4>  {this.state.beach.swell} </h4>
                    <p> size: {this.state.beach.size} </p>
                    <p> tide: {this.state.beach.tide} </p>
                    <p> wind: {this.state.beach.wind} </p>
            </div>
        )
    }
}
