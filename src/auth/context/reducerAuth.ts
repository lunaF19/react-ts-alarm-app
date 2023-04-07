import { types } from '../types/types'



export interface userAuthType{
    uid: string | null;
    email: string | null;
    displayName: string | null;
}

export interface stateAuthReducerType{
    user: userAuthType;
    logged: boolean;
}

interface ReducerPayloadType {
    user?: userAuthType
}

interface actionReducerType{
    type: string;
    payload: ReducerPayloadType
}



export const authRducer = (state:stateAuthReducerType, { type, payload }: actionReducerType):stateAuthReducerType => {
    console.log("authRducer ",{ state })
    switch (type) {
        case types.login:
            return {
                ...state,
                ...payload.user,
                logged: true,
            }
        case types.changeInfo:
            return {
                ...state,
                ...payload.user,
                user: { uid: payload.user?.uid, displayName: payload.user?.displayName},
                logged: true,
            }
        case types.logout:
            return {
                user:{uid: null, displayName: null},
                logged: false,
            }
        default:
            return state;
    }
}