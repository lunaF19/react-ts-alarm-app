import { useEffect, useReducer } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { authFB } from "../../api/firebase/config"

import AuthContext from "./AuthContext";


interface AuthProviderProps {
    children: JSX.Element
}

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props

    useEffect(() => {
        onAuthStateChanged(authFB, (user) => {
            if (user) { // isValid
            } else {
                alert("Se debe des loggear")
                //onLogOut()
            }
        });

    }, [])

    return (
        <AuthContext.Provider
            value={{}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider