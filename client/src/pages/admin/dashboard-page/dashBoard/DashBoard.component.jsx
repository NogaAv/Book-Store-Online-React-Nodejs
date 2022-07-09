import React, { useState } from 'react';
import CstmBtn from '../../../../components/custom-btn/CstmBtn.component';
import AddBookModal from '../dashBoard/add-book-modal/AddBookModal.component.jsx';
import UpdateBookModal from '../dashBoard/update-book-modal/UpdateBookModal.component.jsx';
import './dashboard.style.css';
import editBookIcon from '../../../../assets/img/edit-book-icon.png';
import addBookIcon from '../../../../assets/img/add-book-icon.png';

const DashBoard = () => {
    const [show, setModalShow] = useState(0);

    const showAddModal = () => {
        setModalShow(0x1);
    };
    const showUpdateModal = () => {
        setModalShow(0x2);
    };

    const hideModal = () => {
        setModalShow(0);
    };

    return (
        <div className="dashboard-container">
            <CstmBtn className="dashboard-btn" onClick={showAddModal}>
                Add
                <img className="book-icon" src={addBookIcon} alt="" />
            </CstmBtn>
            {(show & 0x1) !== 0 && <AddBookModal title="Add Book" setShow={hideModal} />}

            <CstmBtn className="dashboard-btn" onClick={showUpdateModal}>
                Update
                <img className="book-icon" src={editBookIcon} alt="" />
            </CstmBtn>
            {(show & 0x2) !== 0 && <UpdateBookModal title="Update Book" setShow={hideModal} />}
        </div>
    );
};

export default DashBoard;
