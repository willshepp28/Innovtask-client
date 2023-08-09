import React, { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }){
    const [authenticationToken, setAuthenticationToken] = useState(null);

    return (
        <AuthenticationContext.Provider value={{ authenticationToken, setAuthenticationToken}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export function useAuthentication(){
    return useContext(AuthenticationContext);
}