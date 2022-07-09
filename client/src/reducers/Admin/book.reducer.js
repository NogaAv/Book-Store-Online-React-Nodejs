import { updateActionType } from '../../actions/form.actions.js';

export const BOOK_FORM_STATE = {
    values: {
        title: '',
        author: '',
        bookCover: '',
        description: '',
        pages: 0,
        price: -1,
        rating: -1,
        id: '',
    },
    validities: {
        title: true,
        author: true,
        bookCover: true,
        description: true,
        pages: true,
        price: true,
        rating: true,
        id: true,
    },
    errMsgs: {
        title: '',
        author: '',
        bookCover: '',
        description: '',
        pages: '',
        price: '',
        rating: '',
        id: '',
    },
};

const BookReducer = (state, action) => {
    switch (action.type) {
        case updateActionType.RESET_STATE: {
            return BOOK_FORM_STATE;
        }
        default: {
            const updatedField = action.type;

            const updatedValues = { ...state.values };
            updatedValues[updatedField] = action.payload.value;

            const updatedValidities = { ...state.validities };
            updatedValidities[updatedField] = action.payload.isValid;

            const updatederrMsgs = { ...state.errMsgs };
            updatederrMsgs[updatedField] = action.payload.errorMessage;

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errMsgs: updatederrMsgs,
            };

            return updatedState;
        }
    }
};

export default BookReducer;
