import React, { Component } from 'react';


const proxyurl = "https://cors-anywhere.herokuapp.com/" //proxy url to bypass cross origin error
const API = "http://api.spitcast.com/api/spot/forecast"

export default class Beach extends Component {
    constructor(props){
       super(props)
       this.state = {
           beach: undefined,
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

       }).catch((err) => {
         console.log("cannot fetch api")
       })
   }

    render() {
        if(!this.state.beach) {
            return (
                <h1 className="loading">Loading...</h1>
            )
        }

        const { id, name, date, hour, swell, size, tide, wind } = this.state.beach

        let link = "http://www.spitcast.com/3/flash/spitcast_chart_flash.swf?lval="+id+"&dcat=day&embed=1"

        return (
            <div className="beach">
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
