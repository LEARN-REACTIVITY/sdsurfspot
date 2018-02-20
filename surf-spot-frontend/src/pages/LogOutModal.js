import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button
} from 'react-bootstrap';

class LogOutModal extends Component {

    render() {
        // Render nothing if the "show" prop is false

        return (
            <div className="backdrop" >
                <div className="modal" >

                    <h3 className="signInTitle">Are you ready to log out?</h3>
                    <h5 className="signInTitle">You will stay checked into your beach.</h5>

                    <div className="bottombutton">
                        <Button id="signUpButton" className="btn btn-primary btn-lg text-uppercase js-scroll-trigger" onClick={this.props.logOut}>
                        Log Out
                        </Button>
                    </div>
                    <div className="signInFooter">
                        <button id="closeButton" className="btn btn-primary btn-sm text-uppercase js-scroll-trigger" onClick={this.props.onClose}>
                        Go Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

LogOutModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default LogOutModal;
