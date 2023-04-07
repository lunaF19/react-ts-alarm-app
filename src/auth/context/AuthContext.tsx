import { createContext  } from "react"
import { userAuthType } from "./reducerAuth"

export interface AuthContextType{
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;