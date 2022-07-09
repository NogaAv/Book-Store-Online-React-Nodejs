import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/Auth.context.jsx';
import { mode, securityModeContext } from '../../../contexts/SecurityMode.context.jsx';
import { UserContext } from '../../../contexts/User.context.jsx';
import { USER_TOKEN, ADNIN_TOKEN, USER_NAME, ADMIN_NAME } from '../../../constants/constants.js';
import './sidebar.styles.css';

const Sidebar = (props) => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const secModeContextValue = useContext(securityModeContext);
    const userContextValue = useContext(UserContext);

    const hideSideBar = () => {
        props.show(false);
    };

    const logout = () => {
        props.show(false);
        userContextValue.setFirstName('');

        switch (secModeContextValue.secModesState) {
            case mode.SwitchOff_userLogged: {
                authContextValue.setUserToken('');
                localStorage.removeItem(USER_TOKEN);
                localStorage.removeItem(USER_NAME);
                alert('Successfully logged out');
                secModeContextValue.setSecModesState(mode.switchOff_userNotLogged);
                navigate('/');
                break;
            }
            case mode.switchOn_userLogged: {
                authContextValue.setUserToken('');
                localStorage.removeItem(USER_TOKEN);
                localStorage.removeItem(USER_NAME);
                alert('Successfully logged out');
                secModeContextValue.setSecModesState(mode.switchOn_userNotLogged);
                navigate('/');
                break;
            }
            case mode.switchOn_adminLogged: {
                authContextValue.setAdminToken('');
                localStorage.removeItem(ADNIN_TOKEN);
                localStorage.removeItem(ADMIN_NAME);
                alert('Successfully logged out');
                secModeContextValue.setSecModesState(mode.switchOn_adminNotLogged);
                navigate('/');
                break;
            }

            default: {
                console.log('Error in logout(). This block should not be reached. file: Sidebar.component.jsx');
            }
        }
    };

    return (
        <div className="backdrop" onClick={hideSideBar}>
            <div className="sidebar">
                <button type="button" className="x-btn" onClick={hideSideBar}>
                    X
                </button>

                <ul className="links-container">
                    <li className="link">
                        <Link className="text-link" to="/" onClick={hideSideBar}>
                            Home
                        </Link>
                        <hr />
                    </li>
                    {(secModeContextValue.secModesState === mode.switchOff_userNotLogged ||
                        secModeContextValue.secModesState === mode.switchOn_userNotLogged ||
                        secModeContextValue.secModesState === mode.switchOff_userNotLogged ||
                        secModeContextValue.secModesState === mode.switchOn_adminNotLogged) && (
                        <li className="link">
                            <Link className="text-link" to="login" onClick={hideSideBar}>
                                Login
                            </Link>
                            <hr />
                        </li>
                    )}

                    {(secModeContextValue.secModesState === mode.SwitchOff_userLogged ||
                        secModeContextValue.secModesState === mode.switchOn_userLogged) && (
                        <li className="link">
                            <Link className="text-link" to="cart" onClick={hideSideBar}>
                                Cart
                            </Link>
                            <hr />
                        </li>
                    )}

                    {secModeContextValue.secModesState === mode.switchOn_adminLogged && (
                        <li className="link">
                            <Link className="text-link" to="admin/dashboard" onClick={hideSideBar}>
                                Dashboard
                            </Link>
                            <hr />
                        </li>
                    )}
                    {(secModeContextValue.secModesState === mode.SwitchOff_userLogged ||
                        secModeContextValue.secModesState === mode.switchOn_userLogged ||
                        secModeContextValue.secModesState === mode.switchOn_adminLogged) && (
                        <li className="link">
                            <Link className="text-link" to="/" onClick={logout}>
                                Logout
                            </Link>
                            <hr />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
