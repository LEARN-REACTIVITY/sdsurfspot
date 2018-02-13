import React, { Component } from 'react';
import NavBar from './NavBar.js'; 
import Footer from './Footer'; 
import {Layout, Media} from 'react-bootstrap'


export default class UserMainPage extends Component {
    render() {
        return(
            
            <div className = 'userMainPage'>           
                <main>
                
                    <div>

                        <Media>
                            <Media.Left align="top">
                            <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
                            </Media.Left>
                            <Media.Body>
                            <Media.Heading>Top aligned media</Media.Heading>
                            <p>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                                fringilla. Donec lacinia congue felis in faucibus.
                            </p>

                            <p>
                                Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
                                leo. Cum sociis natoque penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus.
                            </p>
                            </Media.Body>
                        </Media>
                       
                    </div>
                </main>           
            </div>
        )
    };

}
