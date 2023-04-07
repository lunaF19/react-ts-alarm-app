import { useEffect } from "react";
import { useAuth } from '../hooks/useAuth'
export const PageLogout = () => {
    
    const {
        authLogOut
    } = useAuth()

    useEffect(() => {
        authLogOut()
    })


    return (
        <div>Deslogeando...</div>
    )
}
