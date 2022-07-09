export const LOGIN_FORM_STATE = {
    values: {
        email: '',
        password: '',
    },
    validities: {
        email: true,
        password: true,
    },
    errMsgs: {
        email: '',
        password: '',
    },
};

const loginFormReducer = (state, action) => {
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

export default loginFormReducer;
