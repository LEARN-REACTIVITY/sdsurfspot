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
                        <h3>Please Sign In</h3>
                        <Button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger" onClick={this.props.signUp}>
                        Sign Up
                        </Button>
                        <Button onClick={this.props.signIn}>
                        Sign In
                        </Button>
                    <div className="footer">
                        <button onClick={this.props.onClose}>
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
