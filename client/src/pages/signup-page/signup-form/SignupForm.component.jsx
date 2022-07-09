import { Link, useNavigate } from 'react-router-dom';
import React, { useReducer, useContext } from 'react';
import { AuthContext } from '../../../contexts/Auth.context.jsx';
import { UserContext } from '../../../contexts/User.context.jsx';
import updateState from '../../../actions/form.actions.js';
import signupFormReducer, { SIGNUP_FORM_STATE } from '../../../reducers/sign-up-form.reducer.js';
import { isEmail, isStrongPassword } from 'validator';
import CstmBtn from '../../../components/custom-btn/CstmBtn.component.jsx';
import FormCard from '../../../components/form/form-card/FormCard.component.jsx';
import FormInputContainer from '../../../components/form/form-card/form-input-container/FormInputContainer.component.jsx';
import './signup-form.style.css';
import { USER_TOKEN, EMAIL, REPEATED_PASSWORD, PASSWORD } from '../../../constants/constants.js';
import { signup } from '../../../services/user.service.js';

const SignupForm = (props) => {
    const navigate = useNavigate();

    const AuthContextValue = useContext(AuthContext);
    const userContextValue = useContext(UserContext);
    const [signupFormState, dipatchSignUpFormState] = useReducer(signupFormReducer, SIGNUP_FORM_STATE);

    const handelName = (event) => {
        const inputName = event.target.value.trim().toLowerCase();
        const field = event.target.name;

        if (inputName === '') {
            dipatchSignUpFormState(
                updateState(
                    field,
                    inputName,
                    false,
                    `Please enter your ${field === 'firstName' ? 'first' : 'last'} name`
                )
            );
        } else {
            dipatchSignUpFormState(updateState(field, inputName, true, ''));
        }
    };

    const handleEmail = (event) => {
        const email = event.target.value.trim().toLowerCase();

        if (!isEmail(email)) {
            dipatchSignUpFormState(updateState(EMAIL, email, false, 'Please enter a valid email address'));
        } else {
            dipatchSignUpFormState(updateState(EMAIL, email, true, ''));
        }
    };

    const handlePassword = (event) => {
        const password = event.target.value;

        if (password !== '' && signupFormState.errMsgs.repeatedPassword !== '') {
            if (password === signupFormState.values.repeatedPassword) {
                dipatchSignUpFormState(
                    updateState(REPEATED_PASSWORD, signupFormState.values.repeatedPassword, true, '')
                );
            } else {
                dipatchSignUpFormState(
                    updateState(REPEATED_PASSWORD, 'Repeated password must match password.', false, '')
                );
            }
        }

        if (!isStrongPassword(password) || password.length > 20) {
            dipatchSignUpFormState(
                updateState(
                    PASSWORD,
                    password,
                    false,
                    'Password must contain 8-20 letters, 1 lower-case, 1 upper-case, a number and a symbol.'
                )
            );
        } else {
            dipatchSignUpFormState(updateState(PASSWORD, password, true, ''));
        }
    };

    const handleReapeatedPassword = (event) => {
        const repeatedPassword = event.target.value;

        if (signupFormState.values.password === '') {
            dipatchSignUpFormState(
                updateState(REPEATED_PASSWORD, repeatedPassword, false, 'Password cannot be empty.')
            );
        } else if (repeatedPassword !== signupFormState.values.password) {
            dipatchSignUpFormState(
                updateState(REPEATED_PASSWORD, repeatedPassword, false, 'Repeated password must match password.')
            );
        } else {
            dipatchSignUpFormState(updateState(REPEATED_PASSWORD, repeatedPassword, true, ''));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !signupFormState.validities.firstName ||
            !signupFormState.validities.lastName ||
            !signupFormState.validities.email ||
            !signupFormState.validities.password ||
            !signupFormState.validities.repeatedPassword ||
            signupFormState.values.firstName === '' ||
            signupFormState.values.lastName === '' ||
            signupFormState.values.email === '' ||
            signupFormState.values.password === '' ||
            signupFormState.values.repeatedPassword === ''
        ) {
            alert('Cannot submit form. Please check your inputs validity');
            return;
        }

        try {
            const { data } = await signup(signupFormState.values);
            const { user, token } = data;

            localStorage.setItem(USER_TOKEN, token);
            AuthContextValue.setUserToken(token);
            userContextValue.setFirstName(user.firstName);

            alert('Account created successfully!');
            navigate('/');
        } catch (err) {
            console.log(err.message);
            alert('Something went wrong!');
        }
    };

    return (
        <FormCard title="Join" onSubmit={handleSubmit}>
            <FormInputContainer
                id="first-name"
                labelText="First Name:"
                required={true}
                handleInput={handelName}
                name="firstName"
                isValid={signupFormState.validities.firstName}
                errMsg={signupFormState.errMsgs.firstName}
            />

            <FormInputContainer
                id="last-name"
                labelText="Last Name:"
                required={true}
                handleInput={handelName}
                name="lastName"
                isValid={signupFormState.validities.lastName}
                errMsg={signupFormState.errMsgs.lastName}
            />

            <FormInputContainer
                id="email"
                labelText="E-mail: "
                required={true}
                type="email"
                handleInput={handleEmail}
                isValid={signupFormState.validities.email}
                errMsg={signupFormState.errMsgs.email}
            />
            <FormInputContainer
                id="password"
                labelText="Enter Password: "
                required={true}
                type="password"
                handleInput={handlePassword}
                isValid={signupFormState.validities.password}
                errMsg={signupFormState.errMsgs.password}
            />
            <FormInputContainer
                id="repeat-password"
                labelText="Repeat Password: "
                required={true}
                type="password"
                handleInput={handleReapeatedPassword}
                isValid={signupFormState.validities.repeatedPassword}
                errMsg={signupFormState.errMsgs.repeatedPassword}
            />
            <Link className="link-to-login" to="/login">
                Already joined? Please Login...
            </Link>
            <CstmBtn type="submit">Create your account</CstmBtn>
        </FormCard>
    );
};

export default SignupForm;
