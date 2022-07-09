import React from 'react';
import FormLabel from './form-label/FormLabel.component';
import FormInput from './form-input/FormInput.component';
import FormErrMsg from '../../form-err-msg/FormErrMsg.component';
import './form-input-container.style.css';

const FormInputContainer = (props) => {
    return (
        <div id={`${props.minwidth ? props.minwidth : ''}`} className={`form-input-container `}>
            <FormLabel htmlFor={props.id} text={props.labelText} />
            <FormInput
                id={props.id}
                type={props.type}
                required={props.required}
                placeholder={props.placeholder}
                handleInput={props.handleInput}
                name={props.name}
                scroll={props.scroll}
                step={props.step}
                width={props.width}
            />
            {props.isValid !== undefined && !props.isValid && <FormErrMsg errMsg={props.errMsg} />}
        </div>
    );
};

export default FormInputContainer;
