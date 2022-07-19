import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    //This section cannot be inside securityModeContext component (because re-render problem if I call setSecModesState inside it)
    //TODO: consider exporting it to 'securityModeContextInit' component located between securityModeContext and this component)
    // const securityModeContextval = useContext(securityModeContext);
    // const currentSecModeState = +localStorage.getItem('security-mode-state');
    // securityModeContextval.setSecModesState(currentSecModeState);
    ////////////////////////////////////////////////////////////////////

    const [firstName, setFirstName] = useState('');

    const value = {
        firstName: firstName,
        setFirstName: setFirstName,
    };
    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
