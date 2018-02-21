import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button
} from 'react-bootstrap';

class Modal extends Component {

    render() {
        // Render nothing if the "show" prop is false

        return (
            <div className="backdrop" >
                <div className="modal" >
                    <h3 className="signInTitle">SIGN UP to access these features!</h3>
                    <div className="topbutton">
                        <a className="modalanchor" href={'/form'}><Button id="signUpButton" className="btn btn-primary btn-lg text-uppercase js-scroll-trigger" >
                        Sign Up
                    </Button></a>
                    </div>
                    <div className="bottombutton">
                        <a href={'/signin'} className="modalanchor"><Button id="signUpButton" className="btn btn-primary btn-lg text-uppercase js-scroll-trigger" >
                        Log In
                    </Button></a>
                    </div>
                    <div className="signInFooter">
                        <button id="closeButton" className="btn btn-primary btn-sm text-uppercase js-scroll-trigger" onClick={this.props.onClose}>
                        Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;
