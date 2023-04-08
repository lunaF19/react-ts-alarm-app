import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { authFB } from "../../api/firebase/config"

import AuthContext from "./AuthContext";


interface AuthProviderProps {
    children: JSX.Element
}

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props
    const navigate = useNavigate()

    
    useEffect(() => {
        onAuthStateChanged(authFB, (user) => {
            if (user) { // isValid
            } else {
                navigate("/auth/logout")
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