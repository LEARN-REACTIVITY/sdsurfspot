import React, { Component } from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Home extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                {this.props.beaches.map(function(element, key) {
                    return  <a key={key} href={`/beaches/${element.id}`}><Card key={key}>
                        <CardTitle title={element.name} />
                        </Card ></a>
                    })}
                    <div>
                      <h3 className='about'>About Our Staff</h3>
                      <p>Christina, Leeann, Jordan, Max</p>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
