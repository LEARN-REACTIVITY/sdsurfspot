import React, { Component } from 'react';
import {Card, CardTitle} from 'material-ui/Card';

export default class Home extends Component {

    render() {
        return (
            <div>
            {this.props.beaches.map(function(element, key) {
              return  <a key={key} href={`/beaches/${element.id}`}><Card key={key}>
                      <CardTitle title={element.name} />
                      </Card></a>
                  })}
            </div>
        )
    }
}
