import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {

    render() {
        // Render nothing if the "show" prop is false

        return (
            <div className="backdrop" >
                <div className="modal" >
                        This is the modal
                        <button onClick={this.props.signUp}>
                        Sign Up
                        </button>
                        <button onClick={this.props.signIn}>
                        Sign In
                        </button>
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
