import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import alarmsSlice from './features/alarmsSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        alarms: alarmsSlice,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>