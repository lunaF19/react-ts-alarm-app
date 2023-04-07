import { createSlice } from '@reduxjs/toolkit';

/* Firebase Imports */
import { collection, setDoc, addDoc, deleteDoc, doc, getDocs, query, where, } from "firebase/firestore";
import { firestoreFB } from '../../api/firebase/config';


export const initDataAlarm: alarmType = {
    uid: "",
    id: "",
    hour: new Date().toString(),
    days: [],
    note: null,
}

export interface alarmType {
    uid: string;
    id: string;
    hour: string;
    days: number[]
    note: string | null
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

} = alarmSlice.actions;

export default alarmSlice.reducer;

export const getAlarmsData = () => (dispatch: any) => {
    try {
        dispatch(taskGetDataAlarms())
        const data: Array<alarmType> = []
        const collectionRef = collection(firestoreFB, "alarm");
        const queryRef = query(collectionRef, where("uid", "==", "DosVijIsWdWO2Kn4aJAJj9Zil5k2"));
        getDocs(queryRef).then((querySnapshot) => {
            let data: Array<alarmType> = []
            querySnapshot.forEach((doc) => {
                const { uid, days, hour, note } = doc.data();
                const { id } = doc

                const itemAlarm: alarmType = { id, uid, days, hour: hour.toDate().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }), note }
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
            hour: alarmItem.hour,
            note: alarmItem.note,
        }).then(docRef => {
            dispatch(successTask())
            dispatch(updateAlarm({
                alarm: {
                    ...alarmItem,
                    hour: alarmItem.hour.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' })
                    // hour: new Date(alarmItem.hour.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }))
                }
            }))
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
            hour: alarmItem.hour,
            days: alarmItem.days,
            note: alarmItem.note,
        }).then(docRef => {
            dispatch(successTask())
            dispatch(newAlarm({
                alarm: {
                    ...alarmItem,
                    id: docRef.id,
                    hour: alarmItem.hour.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' })
                    // hour: new Date(alarmItem.hour.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }))
                }
            }))
        });
    } catch (err) {
        console.error(err)
    }
};


export const deleteAlarmData = (alarmItem: any) => (dispatch: any) => {
    try {
        dispatch(taskDeleteAlarm())
        const collectionRef = collection(firestoreFB, "alarm");
        const docAlarm = doc(collectionRef, alarmItem.id)
        deleteDoc(docAlarm).then(docRef => {
            dispatch(successTask())
            dispatch(deleteAlarm({
                alarm: {
                    ...alarmItem
                }
            }))
        });
    } catch (err) {
        console.error(err)
    }
};



