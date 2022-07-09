import React from 'react';
import './form-label.style.css';

const FormLabel = (props)=>{
    return (
        <label className='form-label' htmlFor={props.htmlFor}>
            {props.text}
        </label>
    );
}

export default FormLabel;