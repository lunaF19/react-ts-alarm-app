import { AnyAction, createSlice } from '@reduxjs/toolkit';

/* Firebase Imports */
import { collection, setDoc, addDoc, deleteDoc, doc, getDocs, query, where, } from "firebase/firestore";
import { firestoreFB } from '../../api/firebase/config';


export const initDataAlarm: alarmType = {
    uid: "",
    id: "",
    hour: new Date().toString(),
    days: [],
    note: null,
    active: true
}

export interface alarmType {
    uid: string;
    id: string;
    hour: string;
    days: number[]
    note: string | null
    active: boolean
}

export interface stateAlarm {
    lastUpdate: string | null;
    data: Array<alarmType>;
    status: number // -1 error, 0 = none, 1 = doing Get, 2 = going, Delete, Update, Add item alarm, 3 = Success in task
}

interface ReducerPayloadType {
    data?: Array<alarmType>;
    alarm?: alarmType
}

interface actionReducerType {
    payload: ReducerPayloadType
}


const itemLsStateAlarms = "alarms-state"

const initialState: stateAlarm = {
    lastUpdate: null,
    data: [],
    status: 0
};


const init = (): stateAlarm => {
    return initialState;
};


export const alarmSlice = createSlice({
    name: 'alarm',
    initialState: init(),
    reducers: {
        taskGetDataAlarms: (state: stateAlarm): stateAlarm => {
            return {
                ...state,
                status: 1,
            }
        },
        taskAddAlarm: (state: stateAlarm): stateAlarm => {
            return {
                ...state,
                status: 2,
            }
        },
        taskUpdateAlarm: (state: stateAlarm): stateAlarm => {
            return {
                ...state,
                status: 2,
            }
        },
        taskDeleteAlarm: (state: stateAlarm): stateAlarm => {
            return {
                ...state,
                status: 2,
            }
        },
        errorTask: (state: stateAlarm): stateAlarm => {
            return {
                ...state,
                status: -1,
            }
        },
        successTask: (state: stateAlarm): stateAlarm => {
            return {
                ...state,
                status: 3,
            }
        },
        initialStatusTask: (state: stateAlarm): stateAlarm => {
            return {
                ...state,
                status: 0,
            }
        },
        newDataAlarms: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { data } = action.payload
            if (!data) return state
            return {
                status: 0,
                lastUpdate: new Date().toString(),
                data: [...data]

            }
        },
        newAlarm: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { alarm } = action.payload
            if (!alarm) return state
            return {
                status: 0,
                lastUpdate: new Date().toString(),
                data: [...state.data, { ...alarm }]
            }
        },
        updateAlarm: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { alarm } = action.payload
            if (!alarm) return state
            const newDataAlarm = state.data.map((itemAlarm) => {
                if (itemAlarm.id === alarm.id) return alarm
                return itemAlarm;
            })

            return {
                status: 0,
                lastUpdate: new Date().toString(),
                data: newDataAlarm
            }
        },
        updateActiveAlarm: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { alarm } = action.payload
            if (!alarm) return state
            const newDataAlarm = state.data.map((itemAlarm) => {
                if (itemAlarm.id === alarm.id) {
                    return {
                        ...itemAlarm,
                        active: alarm.active
                    }
                }
                return itemAlarm;
            })

            return {
                status: 0,
                lastUpdate: new Date().toString(),
                data: newDataAlarm
            }
        },
        deleteAlarm: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { alarm } = action.payload
            if (!alarm) return state
            const newDataAlarm = state.data.filter((itemAlarm) => (itemAlarm.id !== alarm.id))

            return {
                status: 0,
                lastUpdate: new Date().toString(),
                data: newDataAlarm
            }
        },

    }
});

export const {
    newDataAlarms,
    newAlarm,
    updateAlarm,
    deleteAlarm,

    taskGetDataAlarms,
    taskAddAlarm,
    taskUpdateAlarm,
    taskDeleteAlarm,
    errorTask,
    successTask,
    updateActiveAlarm,
    initialStatusTask,

} = alarmSlice.actions;

export default alarmSlice.reducer;

export const getAlarmsData = (uid: string) => (dispatch: any) => {
    try {
        dispatch(taskGetDataAlarms())
        const collectionRef = collection(firestoreFB, "alarm");
        const queryRef = query(collectionRef, where("uid", "==", uid));
        getDocs(queryRef).then((querySnapshot) => {
            const data: Array<alarmType> = []
            querySnapshot.forEach((doc) => {
                const { uid, days, hour, note, active } = doc.data();
                const { id } = doc
                const itemAlarm: alarmType = { id, uid, days, active, hour: hour.toDate().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }), note }
                data.push(itemAlarm)
            });
            dispatch(successTask())
            dispatch(newDataAlarms({ data }))

        }).catch(err => {
            console.error(err)
        });
    } catch (err) {
        console.error(err)
    }
};


export const setAlarmData = (alarmItem: any) => (dispatch: any) => {
    try {
        dispatch(taskUpdateAlarm())
        const collectionRef = collection(firestoreFB, "alarm");
        const docAlarm = doc(collectionRef, alarmItem.id)
        setDoc((docAlarm), {
            uid: alarmItem.uid,
            days: alarmItem.days,
            hour: new Date(alarmItem.hour),
            note: alarmItem.note,
            active: alarmItem.active,
        }).then(docRef => {
            dispatch(updateAlarm({
                alarm: {
                    ...alarmItem,
                    hour: new Date(alarmItem.hour).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' })
                    // hour: new Date(alarmItem.hour.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }))
                }
            }))
            dispatch(successTask())
            setTimeout(() => {
                dispatch(initialStatusTask())
            }, 1000)
        });
    } catch (err) {
        console.error(err)
    }
};

export const addAlarmData = (alarmItem: any) => (dispatch: any) => {
    try {
        dispatch(taskAddAlarm())
        const collectionRef = collection(firestoreFB, "alarm");
        addDoc((collectionRef), {
            uid: alarmItem.uid,
            hour: new Date(alarmItem.hour),
            days: alarmItem.days,
            note: alarmItem.note,
            active: alarmItem.active,
        }).then(docRef => {
            dispatch(newAlarm({
                alarm: {
                    ...alarmItem,
                    id: docRef.id,
                    hour: new Date(alarmItem.hour).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' })
                }
            }))
            dispatch(successTask())
            setTimeout(() => {
                dispatch(initialStatusTask())
            }, 1000)
        });
    } catch (err) {
        console.error(err)
    }
};


export const deleteAlarmData = (alarmItem: alarmType) => (dispatch: any) => {
    try {
        dispatch(taskDeleteAlarm())
        const collectionRef = collection(firestoreFB, "alarm");
        const docAlarm = doc(collectionRef, alarmItem.id)
        deleteDoc(docAlarm).then(docRef => {
            dispatch(deleteAlarm({
                alarm: {
                    ...alarmItem
                }
            }))
            dispatch(successTask())
            setTimeout(() => {
                dispatch(initialStatusTask())
            }, 1000)
        });
    } catch (err) {
        console.error(err)
    }
};


export const setActiveAlarm = (alarmItem: any) => (dispatch: any): void => {
    try {
        dispatch(taskUpdateAlarm())
        const collectionRef = collection(firestoreFB, "alarm");
        const docAlarm = doc(collectionRef, alarmItem.id)
        setDoc((docAlarm), {
            uid: alarmItem.uid,
            days: alarmItem.days,
            hour: new Date(alarmItem.hour),
            note: alarmItem.note,
            active: !Boolean(alarmItem.active),
        }).then(docRef => {
            dispatch(updateActiveAlarm({
                alarm: {
                    ...alarmItem,
                    active: !Boolean(alarmItem.active),
                    hour: new Date(alarmItem.hour).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' })
                }
            }))
            dispatch(successTask())
            setTimeout(() => {
                dispatch(initialStatusTask())
            }, 1000)
        });
    } catch (err) {
        console.error(err)
    }
};