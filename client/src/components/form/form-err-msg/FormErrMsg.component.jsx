import React from 'react';
import './form-err-msg.style.css';

const FormErrMsg = (props) => {
    return (
        <div className="err-container">
            {props.errMsg !== '' && <div className="form-msg-astrx">*</div>}
            <div className="form-err-msg">{props.errMsg}</div>
        </div>
    );
};

export default FormErrMsg;
