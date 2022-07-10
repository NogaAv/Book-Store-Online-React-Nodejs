import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import updateState, { updateActionType } from '../../../../../actions/form.actions.js';
import FormCard from '../../../../../components/form/form-card/FormCard.component';
import CstmBtn from '../../../../../components/custom-btn/CstmBtn.component';
import FormInputContainer from '../../../../../components/form/form-card/form-input-container/FormInputContainer.component';
import Modal from '../modal/Modal.component';
import { getBooks } from '../../../../../services/book.service.js';
import { RATING, ID } from '../../../../../constants/constants.js';
import Select from 'react-select';

import './add-or-update-book-modal.style.css';

const AddOrUpdateBookModal = (props) => {
    const [clear, setClear] = useState(false);
    const [rating, setRating] = useState(0);
    const [updateRatingEnabeled, setUpdateRatingEnabeled] = useState(false);
    const [editSelected, setEditSelected] = useState(true);
    const [addFormSectionFilled, setAddFormSectionFilled] = useState(false);
    const [options, setOptions] = useState([]);
    const { bookFormState } = props;

    useEffect(() => {
        const getAllBooks = async () => {
            const optionsArr = [];
            try {
                const { data } = await getBooks();
                let { books } = data;
                books = books.map((book) => {
                    return { ...book, title: book.title.toLowerCase() };
                });

                books.sort((book1, book2) => {
                    return book1.title.charCodeAt(0) - book2.title.charCodeAt(0);
                });
                optionsArr.push({ value: '', label: `Select...` });

                books.map((book) => optionsArr.push({ value: book._id, label: `${book.title}, By: ${book.author}` }));
                setOptions(optionsArr);
                console.log('Successfully fetched books from server');
            } catch (err) {
                console.log(err);
                alert('Something went wrong');
            }
        };
        getAllBooks();
    }, []);
    const clearForm = () => {
        setClear(true);
        setTimeout(() => {
            setClear(false);
        }, 1);
        props.dipatchBookReducer(updateState(updateActionType.RESET_STATE));
    };

    const continueToNextForm = () => {
        if (
            props.title.includes('Add') &&
            (bookFormState.values.title === '' ||
                bookFormState.values.author === '' ||
                bookFormState.values.description === '')
        ) {
            alert('Please fill all form sections to continue');
        } else {
            setAddFormSectionFilled(true);
        }
    };
    const toPreviousForm = () => {
        setAddFormSectionFilled(false);
        clearForm();
    };

    const handleRating = (rate) => {
        rate /= 20;
        setRating(rate);
        props.dipatchBookReducer(updateState(RATING, rate, true, ''));
    };

    const handleChange = () => {
        const changedRatingEnabeled = !updateRatingEnabeled;
        setUpdateRatingEnabeled(!updateRatingEnabeled);

        const ratingValue = changedRatingEnabeled ? 0 : -1;
        props.dipatchBookReducer(updateState(RATING, ratingValue, true, ''));
    };

    function getValue(chosenOption) {
        if (chosenOption.label !== 'Select...') {
            props.dipatchBookReducer(updateState(ID, chosenOption.value, true, ''));
        } else {
            props.dipatchBookReducer(updateState(ID, '', false, 'Book selection is required'));
        }
    }

    const handelEdit = () => {
        setEditSelected(true);
    };

    const handelDelete = () => {
        setEditSelected(false);
    };

    return (
        <Modal setShow={props.setShow}>
            {clear || (
                <FormCard
                    border="none"
                    title={props.title}
                    onSubmit={props.onSubmit || (editSelected ? props.editBookOnSubmit : props.deleteBookOnSubmit)}
                >
                    {props.handelupdate && !addFormSectionFilled && (
                        <div className="selections-container">
                            <div className={`radio-selection ${!editSelected ? 'small-display' : ''}`}>
                                <div id="edit">
                                    <input
                                        type="radio"
                                        value="edit"
                                        name="operation"
                                        checked={editSelected}
                                        onChange={handelEdit}
                                    />
                                    <b>Edit</b>
                                </div>
                                <div id="delete">
                                    <input
                                        type="radio"
                                        value="delete"
                                        name="operation"
                                        checked={!editSelected}
                                        onChange={handelDelete}
                                    />
                                    <b>Delete</b>
                                </div>
                            </div>
                            <Select options={options} onChange={getValue} defaulyValue="" className="select" />
                        </div>
                    )}

                    {editSelected && (
                        <div className="form-sections">
                            {!addFormSectionFilled && (
                                <div className="form-section">
                                    <FormInputContainer
                                        id="title"
                                        labelText="Title:"
                                        required={props.required.title}
                                        handleInput={props.handelTitle}
                                        name="title"
                                        isValid={bookFormState.validities.title}
                                        errMsg={bookFormState.errMsgs.title}
                                    />
                                    <FormInputContainer
                                        id="author"
                                        labelText="Author:"
                                        required={props.required.author}
                                        handleInput={props.handelAuthor}
                                        name="author"
                                        isValid={bookFormState.validities.author}
                                        errMsg={bookFormState.errMsgs.author}
                                    />
                                    <FormInputContainer
                                        id="description"
                                        labelText="Book description:"
                                        required={props.required.description}
                                        handleInput={props.handelDescription}
                                        name="description"
                                        scroll="scroll"
                                        isValid={bookFormState.validities.description}
                                        errMsg={bookFormState.errMsgs.description}
                                    />
                                    <div className="rating-container">
                                        {props.handelupdate && (
                                            <>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={updateRatingEnabeled}
                                                        onChange={handleChange}
                                                    />
                                                    Update Rating
                                                </label>
                                                {updateRatingEnabeled && (
                                                    <Rating
                                                        className="rating"
                                                        onClick={handleRating}
                                                        ratingValue={rating}
                                                        transition={true}
                                                    />
                                                )}
                                            </>
                                        )}
                                        {!props.handelupdate && (
                                            <>
                                                <p>Rating:</p>
                                                <Rating
                                                    className="rating"
                                                    onClick={handleRating}
                                                    ratingValue={rating}
                                                    transition={true}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="update-operations-btn">
                                        <CstmBtn className="update-operation-btn" onClick={clearForm}>
                                            Clear
                                        </CstmBtn>
                                        <CstmBtn className="update-operation-btn" onClick={continueToNextForm}>
                                            Next
                                        </CstmBtn>
                                    </div>
                                </div>
                            )}
                            {addFormSectionFilled && (
                                <div className="form-section">
                                    <FormInputContainer
                                        id="bookCover"
                                        labelText="Book cover url:"
                                        required={props.required.bookCover}
                                        handleInput={props.handelBookCover}
                                        name="bookCover"
                                        isValid={bookFormState.validities.bookCover}
                                        errMsg={bookFormState.errMsgs.bookCover}
                                    />
                                    <FormInputContainer
                                        id="pages"
                                        labelText="Number of pages:"
                                        type="number"
                                        required={props.required.pages}
                                        handleInput={props.handelPagesCount}
                                        name="pages"
                                        isValid={bookFormState.validities.pages}
                                        errMsg={bookFormState.errMsgs.pages}
                                        minwidth="min-width"
                                    />
                                    <FormInputContainer
                                        id="price"
                                        labelText="Price:"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required={props.required.price}
                                        handleInput={props.handelPrice}
                                        name="price"
                                        isValid={bookFormState.validities.price}
                                        errMsg={bookFormState.errMsgs.price}
                                        minwidth="min-width"
                                    />
                                    <div className="update-operations-btn">
                                        <CstmBtn className="update-operation-btn" onClick={toPreviousForm}>
                                            Start over
                                        </CstmBtn>
                                        <CstmBtn className="update-operation-btn" type="submit">
                                            Save
                                        </CstmBtn>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {!editSelected && (
                        <div className="update-operations-btn">
                            <CstmBtn className="update-operation-btn" type="submit">
                                Delete
                            </CstmBtn>
                            <CstmBtn className="update-operation-btn" onClick={clearForm}>
                                Clear
                            </CstmBtn>
                        </div>
                    )}
                </FormCard>
            )}
        </Modal>
    );
};

export default AddOrUpdateBookModal;
