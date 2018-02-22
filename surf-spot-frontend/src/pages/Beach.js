import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from './Modal';

const proxyurl = "https://cors-anywhere.herokuapp.com/" //proxy url to bypass cross origin error
const API = "http://api.spitcast.com/api/spot/forecast"

var backApi
if(process.env.NODE_ENV === 'production') {
    backApi = "/"
} else {
    backApi =  "http://localhost:3000"
}

export default class Beach extends Component {
    constructor(props){
       super(props)
       this.state = {
           beach: undefined,
           result: {},
           location: {},
           isCheckedIn: false,
           isOpen: false
       }
   }

   componentWillMount(){
       setTimeout(() => {
           this.getBeach()
       }, 1000)
       this.checkInState()
   }

   checkInState() {
       if(localStorage.getItem('checkCount') !== null) {
           this.setState({isCheckedIn: true})
       }
   }

   toggleModal = () => {
       this.setState({
           isOpen: !this.state.isOpen
       })
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
             // this.fetchCheckins(this.state.beach.id)

       }).then(()=> {
           this.fetchCheckins(this.state.beach.id)
       }).catch((err) => {
         console.log("cannot fetch api")
       })
   }

   fetchCheckins(beachId) {
       var token = localStorage.getItem('authToken')
       var id = beachId
           if(true) {
               fetch(`${backApi}api/checkin/${id}`, {
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
                       this.setState({
                           result: result
                       })
                   }
               }).then(()=> {
                   console.log(this.state.result)
               })
               .catch(e => console.log(e))
           }
   }

   handleCheckIn(beachName, id) {
       var token = localStorage.getItem('authToken')
       var countCheck = localStorage.getItem('checkCount')
       if (token === null) {
           this.toggleModal()
       } else {
           if(countCheck === null) {
               var params = {
                   name: beachName,
                   authToken: token
               }

               fetch(`${backApi}api/user_beaches`, {
                   body: JSON.stringify(params),  // <- we need to stringify the json for fetch
                   headers: {  // <- We specify that we're sending JSON, and expect JSON back
                     'Content-Type': 'application/json'
                   },
                   method: "PUT"  // <- Here's our verb, so the correct endpoint is invoked on the server
               }).then(() => {
                   localStorage.setItem('checkCount', true)
                   localStorage.setItem('beach', beachName)
                   this.setState({
                       isCheckedIn: true
                   })
                   this.fetchCheckins(id)
               }).then(()=> {
                   this.fetchCheckins(id)
               })

           } else {
               alert("You're already checked in.")
           }
       }
   }

   handleCheckOut(beachName, beachId) {
       var token = localStorage.getItem('authToken')
       var countCheck = localStorage.getItem('checkCount')
       const { isCheckedIn } = this.state
       if (token === null) {
           this.toggleModal()
       } else {
           if(isCheckedIn) {
               var params = {
                   name: beachName,
                   authToken: token
               }

               fetch(`${backApi}api/user_beaches/checkout`, {
                   body: JSON.stringify(params),  // <- we need to stringify the json for fetch
                   headers: {  // <- We specify that we're sending JSON, and expect JSON back
                     'Content-Type': 'application/json'
                   },
                   method: "PUT"  // <- Here's our verb, so the correct endpoint is invoked on the server
               }).then(() => {
                   localStorage.removeItem('checkCount')
                   localStorage.removeItem('beach')
                   this.setState({
                       isCheckedIn: false
                   })
                   this.fetchCheckins(beachId)
               }).then(() => {
                   this.fetchCheckins(beachId)
               })

           } else {
               alert("You are not checked in.")
           }
       }
   }


    render() {
        if(!this.state.beach) {
            return (
                <h1 className="loading">LOADING...</h1>
            )
        }
        var spot = localStorage.getItem('beach')

        const { id, name, date, hour, swell, size, tide, wind } = this.state.beach
        let { result } = this.state

        let link = proxyurl+"http://www.spitcast.com/3/flash/spitcast_chart_flash.swf?lval="+id+"&dcat=day&embed=1"

        return (
            <div id="beach">
                <div className="backgroundImageBeach">
                    <div className="container-fluid-beach"><br/><br/><br/>
                        <div className="textBlock">
                            <br />
                            <br />
                            <br />
                                <div className="TitleBeachOnly">
                                    <h1 className="beachtitel">{name}</h1>
                                </div>
                            <br/>
                            <div className="TextBeach">
                                <div className="datetime">
                                    <p> Date&nbsp;: &nbsp;{date} &nbsp; | &nbsp; Time of report&nbsp;: &nbsp;{hour} </p>
                                </div>
                            <br/>
                            <h3 className="BeachDetails">Swell Details&nbsp;:  &nbsp; {swell}</h3>
                                <div id="sizeTideWind">
                                    <p className="subtitle"> Size&nbsp;:</p><h4 className="value">&nbsp; {size} </h4><br/>
                                    <p className="subtitle"> Tide&nbsp;:</p><h4 className="value">&nbsp; {tide} </h4><br/>
                                    <p className="subtitle"> Wind&nbsp;:</p><h4 className="value">&nbsp; {wind} </h4><br/>
                                </div>
                            <div id="surfersCheckedIn">
                                <h3 className="NumSurfers">{result[id]}</h3>
                                <p className="subtitle"> &nbsp; are checked in right now</p>
                                {!this.state.isCheckedIn &&
                                <Button onClick={this.handleCheckIn.bind(this, this.state.beach.name, this.state.beach.id)} className="checkInBeach" bsSize="xsmall">Check In</Button> }

                                {this.state.isCheckedIn && (spot === this.state.beach.name ) &&
                                <Button onClick={this.handleCheckOut.bind(this, this.state.beach.name, this.state.beach.id)} className="checkInBeach" bsSize="xsmall">Check Out</Button> }
                            </div>
                        </div>
                    </div>
                    <div className="BeachBoxLeft">
                        <div className="whiteboardForecast">
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
                    </div>


                </div>
            </div>
        {this.state.isOpen &&
        <div>
            <Modal
                onClose={this.toggleModal.bind(this)}
                        />
        </div>
        }
        </div>
        )
    }
}
