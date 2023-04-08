import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OAuthCredential, UserCredential, PopupRedirectResolver } from "firebase/auth"
import { onLogin, onLogOut, onErrorLogin } from "../../store/features/authSlice"
import notify from "../../UI/utils/notify"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import { URL_API } from "../../config";

import { useAppDispatch } from "../../store/hooks"

import { authFB, errorsFB } from "../../api/firebase/"

interface resAuthType {
    error: string | number,
    message: string
}

export const useAuth = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [resAuth, setResAuth] = useState<resAuthType>({ error: "", message: "" })

    const notifyRef = useRef(null)
    // // Para hacer register FireBase
    // const authRegister = async (infoRegister:any) => {
    //     const { email, password } = infoRegister
    //     try {
    //         const res = await createUserWithEmailAndPassword(authFB, email, password)
    //         const access_token = res.user.accessToken
    //         const userCredentials = res.user
    //         const { localId } = userCredentials.reloadUserInfo

    //         const user = { role_id: "BASIC", username: email, email: email, userId: localId, role_id: "AD", logged: true }

    //         localStorage.setItem('token', access_token)
    //         localStorage.setItem('token-init-data', new Date().getTime())

    //         onLogin(user)
    //         setResAuth(prev => ({ ...prev, access_token, user, role_id: "BASIC" }))
    //         navigate("/dashboard/profileUser")
    //         notify.info("Recuerda actualizar tu información para poder realizar alguna reservación.")

    //     } catch (err) {
    //         console.error(err)
    //         localStorage.clear()
    //         // message
    //         const { code } = err
    //         setResAuth(prev => ({ ...prev, error: code, message: errorsFB[code] }))
    //     }
    // }

    // Para hacer login FireBase
    const authLogin = async (loginInfo: { email: string, password: string }) => {
        notify.promiseStar(notifyRef, "Wait....")
        try {
            setResAuth(prev => ({ ...prev, error: 0, message: "" }))
            const res = await signInWithEmailAndPassword(authFB, loginInfo.email, loginInfo.password)

            if (!res) throw new Error("Credential is null")

            const { user: { displayName, email, uid, } } = res
            const user = {
                displayName,
                email,
                uid,
            }
            dispatch(onLogin(user))
            notify.promiseEnd.success(notifyRef, `Welcome ${displayName || user.email?.split("@")[0]}`)
            navigate("/alarms");

        } catch (err) {
            console.error("Login", err)
            dispatch(onErrorLogin())
            //message
            const { code } = err as any
            const message = errorsFB[code] || "uncontrolled error"
            setResAuth({ error: code, message: message })

            notify.promiseEnd.error(notifyRef, message)
        }
    }

    // Para hacer login FireBase Google
    const authGoogleLogin = async () => {
        try {
            setResAuth({ error: 0, message: "" })
            notify.promiseStar(notifyRef, "Login with google...")
            const provider = new GoogleAuthProvider();

            const resSingInWithPopupGoogle = await signInWithPopup(authFB, provider) as UserCredential

            const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(resSingInWithPopupGoogle);
            if (!credential) throw new Error("Credential is null")
            const { accessToken } = credential

            const { user: { displayName, email, uid } } = resSingInWithPopupGoogle

            const user = {
                displayName,
                email,
                uid,
            }
            dispatch(onLogin(user))
            notify.promiseEnd.success(notifyRef, `Welcome ${displayName || user.email?.split("@")[0]}`)
            navigate("/alarms");

        } catch (err: any) {
            dispatch(onErrorLogin())
            console.error(err)
            //message
            const { code } = err as any
            const message = errorsFB[code] || "uncontrolled error"
            setResAuth({ error: code, message: message })

            notify.promiseEnd.error(notifyRef, message)
        }
    }

    const authLogOut = () => {
        localStorage.clear()
        dispatch(onLogOut())
        navigate('/auth/login')
    }

    return {
        ...resAuth,
        authGoogleLogin,
        authLogin,
        authLogOut
    }
}