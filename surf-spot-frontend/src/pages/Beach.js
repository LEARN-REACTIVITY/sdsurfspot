import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


const proxyurl = "https://cors-anywhere.herokuapp.com/" //proxy url to bypass cross origin error
const API = "http://api.spitcast.com/api/spot/forecast"
const backApi =  "http://localhost:3000"

export default class Beach extends Component {
    constructor(props){
       super(props)
       this.state = {
           beach: undefined,
           result: {},
           location: {}
       }
   }

   componentWillMount(){
       setTimeout(() => {
           this.getBeach()
       }, 1000)
   }

   getBeach = () => {
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
             this.fetchCheckins(this.state.beach)

       }).catch((err) => {
         console.log("cannot fetch api")
       })
   }

   // fetchLocation() {
   //     fetch(`${backApi}/location/${id}`, {
   //         method: 'GET'
   //     })
   //     .then((raw) => raw.json())
   //     .then((res) => {
   //
   //     })
   // }

   fetchCheckins(beach) {
       var token = localStorage.getItem('authToken')
       var id = beach.id
           if(true) {
               fetch(`${backApi}/checkin/${id}`, {
                   method: 'GET',  // <- Here's our verb, so the correct endpoint is invoked on the server
                   headers: {  // <- We specify that we're sending JSON, and expect JSON back
                       'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + token,
                   },
               })
               .then((raw) => raw.json())
               .then((res) => {
                   const { errors, metadata } = res
                   let { result } = this.state

                   if(errors != undefined) {
                       this.setState({
                           errors: errors,
                       })
                   } else {
                       result[id] = metadata.rowCount
                       console.log(result)
                       this.setState({
                           result: result
                       })
                   }
               })
               .catch(e => console.log(e))
           }
   }

   handleCheckIn(beachName) {
       var token = localStorage.getItem('authToken')
       var countCheck = localStorage.getItem('checkCount')
       if (token === null) {
           alert("Please sign in or register.")
       } else {
           if(countCheck === null) {
               var params = {
                   name: beachName,
                   authToken: token
               }

               fetch(`${backApi}/user_beaches`, {
                   body: JSON.stringify(params),  // <- we need to stringify the json for fetch
                   headers: {  // <- We specify that we're sending JSON, and expect JSON back
                     'Content-Type': 'application/json'
                   },
                   method: "PUT"  // <- Here's our verb, so the correct endpoint is invoked on the server
               }).then(() => {
                   localStorage.setItem('checkCount', true)

               })

           } else {
               alert("You're already checked in.")
           }
       }
   }

    render() {
        if(!this.state.beach) {
            return (
                <h1 className="loading">Loading...</h1>
            )
        }

        const { id, name, date, hour, swell, size, tide, wind } = this.state.beach
        let { result } = this.state

        let link = "http://www.spitcast.com/3/flash/spitcast_chart_flash.swf?lval="+id+"&dcat=day&embed=1"

        return (

            <div className="beach">
                <div>
                    <h5 className="BeachCheckedIn">{result[id]}</h5> <p className="BeachCheckedIn"> Surfers are checked in right now</p>
                    <Button onClick={this.handleCheckIn.bind(this, this.state.beach.name)} className="checkIn" bsSize="xsmall">Check In</Button>
                </div>
                <h1 className="beachtitel">{name}</h1>
                <div className="datetime">
                    <p> Date: {date} </p>
                    <p> Time of report: {hour} </p>
                </div>
                <h3>Swell Details</h3>
                <h4>  {swell} </h4>
                <p> size: {size} </p>
                <p> tide: {tide} </p>
                <p> wind: {wind} </p>
                <div className="forecast">
                    <object
                        classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
                        codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"
                        width="600"
                        height="300"
                        className="forecast"
                        align="middle"
                    >
                    <param name="allowScriptAccess" value="always" />
                    <param name="allowFullScreen" value="false" />
                    <param name="movie" value={link} />
                    <param name="quality" value="high" />
                    <param name="bgcolor" value="#ffffff" />
                    <embed
                        src={link}
                        quality="high"
                        bgcolor="#ffffff"
                        width="600"
                        height="300"
                        name="spitcast_chart_flash"
                        align="middle"
                        allowScriptAccess="always"
                        allowFullScreen="false"
                        type="application/x-shockwave-flash"
                        pluginspage="http://www.macromedia.com/go/getflashplayer"
                    />
                    </object>
                </div>
            </div>
        )
    }
}
//
// class SpitcastGraph extends Component {
//     render() {
//         return (
//             <br />
//         )
//     }
// }
