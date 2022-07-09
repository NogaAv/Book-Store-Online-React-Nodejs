import { useNavigate, Link } from 'react-router-dom';
import React, { useReducer, useContext } from 'react';
import loginFormReducer, { LOGIN_FORM_STATE } from '../../../reducers/login-form.reducer.js';
import { AuthContext } from '../../../contexts/Auth.context.jsx';
import { UserContext } from '../../../contexts/User.context.jsx';
import { mode, securityModeContext } from '../../../contexts/SecurityMode.context.jsx';
import updateState from '../../../actions/form.actions.js';
import { isEmail, isStrongPassword } from 'validator';
import CstmBtn from '../../../components/custom-btn/CstmBtn.component.jsx';
import FormCard from '../../../components/form/form-card/FormCard.component.jsx';
import FormInputContainer from '../../../components/form/form-card/form-input-container/FormInputContainer.component.jsx';
import { login } from '../../../services/user.service.js';
import { USER_TOKEN, ADNIN_TOKEN, USER_NAME, ADMIN_NAME, EMAIL, PASSWORD } from '../../../constants/constants.js';
import './login-form.style.css';

const LoginForm = (props) => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const userContextValue = useContext(UserContext);
    const [loginFormState, dipatchLoginFormState] = useReducer(loginFormReducer, LOGIN_FORM_STATE);
    const secModeContextValue = useContext(securityModeContext);

    const handleEmail = (event) => {
        const email = event.target.value.trim().toLowerCase();

        if (!isEmail(email)) {
            dipatchLoginFormState(updateState(EMAIL, email, false, 'Please enter a valid email address'));
        } else {
            dipatchLoginFormState(updateState(EMAIL, email, true, ''));
        }
    };

    const handlePassword = (event) => {
        const password = event.target.value;

        if (!isStrongPassword(password) || password.length > 20) {
            dipatchLoginFormState(
                updateState(
                    'password',
                    password,
                    false,
                    'Password must contain 8-20 letters, 1 lower-case, 1 upper-case, a number and a symbol.'
                )
            );
        } else {
            dipatchLoginFormState(updateState(PASSWORD, password, true, ''));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !loginFormState.validities.email ||
            !loginFormState.validities.password ||
            loginFormState.values.email === '' ||
            loginFormState.values.password === ''
        ) {
            alert('Cannot submit form. Please check your login inputs validity');
            return;
        }

        let identity;
        if (secModeContextValue.secModesState === mode.switchOn_adminNotLogged) {
            identity = 'admin';
        } else {
            identity = 'user';
        }
        try {
            const { data } = await login(identity, loginFormState.values);

            if (identity === 'user') {
                const { user, token } = data;

                localStorage.setItem(USER_TOKEN, token);
                localStorage.setItem(USER_NAME, user.firstName);

                authContextValue.setUserToken(token);
                secModeContextValue.secModesState === mode.switchOn_userNotLogged
                    ? secModeContextValue.setSecModesState(mode.switchOn_userLogged)
                    : secModeContextValue.setSecModesState(mode.SwitchOff_userLogged);
                userContextValue.setFirstName(user.firstName);
            } else if (identity === 'admin') {
                const { admin, token } = data;

                localStorage.setItem(ADNIN_TOKEN, token);
                localStorage.setItem(ADMIN_NAME, admin.firstName);
                authContextValue.setAdminToken(token);
                secModeContextValue.setSecModesState(mode.switchOn_adminLogged);
                userContextValue.setFirstName(admin.firstName);
            }

            navigate('/');
        } catch (err) {
            alert('Failed to login');
            console.log(err.message);
        }
    };

    return (
        <FormCard title={props.title} onSubmit={handleSubmit}>
            <FormInputContainer
                id="email"
                labelText="E-mail: "
                required={true}
                type="email"
                handleInput={handleEmail}
                isValid={loginFormState.validities.email}
                errMsg={loginFormState.errMsgs.email}
            />
            <FormInputContainer
                id="password"
                labelText="Enter Password: "
                required={true}
                type="password"
                handleInput={handlePassword}
                isValid={loginFormState.validities.password}
                errMsg={loginFormState.errMsgs.password}
            />
            {secModeContextValue.secModesState < mode.switchOn_adminNotLogged && (
                <Link className="link-to-login" to="/signup">
                    Not joined yet? Please join...
                </Link>
            )}
            <CstmBtn type="submit">Login</CstmBtn>
        </FormCard>
    );
};

export default LoginForm;
