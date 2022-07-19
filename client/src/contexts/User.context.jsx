import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [firstName, setFirstName] = useState('');

    const value = {
        firstName: firstName,
        setFirstName: setFirstName,
    };
    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
