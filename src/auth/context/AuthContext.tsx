import { createContext } from "react"

export interface AuthContextType {
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;