import { createSlice } from '@reduxjs/toolkit';

export interface userAuthType {
    uid: string | null;
    email: string | null;
    displayName: string | null;
}

export interface stateAuthReducerType {
    user: userAuthType;
    logged: boolean;
}

interface ReducerPayloadType {
    user: userAuthType
}

interface actionReducerType {
    payload: ReducerPayloadType
}


const itemLsStateAuth = "userAuth"
const initialState: stateAuthReducerType = {
    user: {
        uid: null,
        displayName: null,
        email: null,
    },
    logged: false
};


const init = (): stateAuthReducerType => {
    try {
        const itemUserLs = localStorage.getItem(itemLsStateAuth);
        console.log({ itemUserLs })
        if (!itemUserLs) throw new Error("User not found");
        const itemUserParseLs = JSON.parse(itemUserLs);
        return { logged: true, user: itemUserParseLs };

    } catch {
        return initialState;
    }
};


export const authSlice = createSlice({
    name: 'auth',
    initialState: init(),
    reducers: {
        login: (state: stateAuthReducerType, action: actionReducerType): stateAuthReducerType => {
            const { user } = action.payload
            return {
                user: { ...user },
                logged: true,
            }
        },
        logout: (): stateAuthReducerType => {
            return { ...initialState }
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;


export const onLogin = (user: userAuthType) => (dispatch: any) => {
    localStorage.setItem(itemLsStateAuth, JSON.stringify(user))
    dispatch(login({ user: { ...user } }))
};

export const onLogOut = () => (dispatch: any) => {
    dispatch(logout())
    localStorage.removeItem(itemLsStateAuth);
};

