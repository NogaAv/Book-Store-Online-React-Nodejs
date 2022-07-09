export const SIGNUP_FORM_STATE = {
    values: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: '',
    },
    validities: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        repeatedPassword: true,
    },
    errMsgs: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: '',
    },
};

const signupFormReducer = (state, action) => {
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
};

export default signupFormReducer;
