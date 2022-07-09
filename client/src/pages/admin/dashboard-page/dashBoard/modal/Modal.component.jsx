import React from 'react';
import './modal.style.css';

const Modal = (props) => {
    const hideModal = () => {
        props.setShow(false);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button type="button" className="x-btn" onClick={hideModal}>
                    X
                </button>
                <div className="modal-container">{props.children}</div>
            </div>
        </div>
    );
};

export default Modal;
