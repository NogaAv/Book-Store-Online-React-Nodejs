export const updateActionType = {
    RESET_STATE: 'RESET_STATE',
};
const updateState = (fieldName, value, isValid, errMsg) => {
    return {
        type: fieldName,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errMsg,
        },
    };
};

export default updateState;
