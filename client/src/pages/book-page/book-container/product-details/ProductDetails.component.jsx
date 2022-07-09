import React from 'react';
import './product-details.style.css';

const ProductDetails = (props) => {
    return (
        <div className="product-details-container">
            <h3>Product Details</h3>
            <ul className="details-list">
                <li>
                    <b>Pages: </b>
                    {props.pages}
                </li>
            </ul>
        </div>
    );
};

export default ProductDetails;
