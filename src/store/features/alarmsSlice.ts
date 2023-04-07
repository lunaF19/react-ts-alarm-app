import { createSlice } from '@reduxjs/toolkit';

/* Firebase Imports */
import { collection, setDoc, addDoc, deleteDoc, doc, getDocs, query, where, } from "firebase/firestore";
import { firestoreFB } from '../../api/firebase/config';


export const initDataAlarm: alarmType = {
    uid: "",
    id: "",
    hour: new Date(),
    days: [],
    note: null,
}

export interface alarmType {
    uid: string;
    id: string;
    hour: Date;
    days: number[]
    note: string | null
}

export interface stateAlarm {
    lastUpdate: Date | null;
    data: Array<alarmType>
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
    data: []
};


const init = (): stateAlarm => {
    return initialState;
};


export const alarmSlice = createSlice({
    name: 'alarm',
    initialState: init(),
    reducers: {
        newDataAlarms: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { data } = action.payload
            if (!data) return state
            return {
                lastUpdate: new Date(),
                data: [...data]
            }
        },
        newAlarm: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { alarm } = action.payload
            if (!alarm) return state
            return {
                lastUpdate: new Date(),
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
                lastUpdate: new Date(),
                data: newDataAlarm
            }
        },
        deleteAlarm: (state: stateAlarm, action: actionReducerType): stateAlarm => {
            const { alarm } = action.payload
            if (!alarm) return state
            const newDataAlarm = state.data.filter((itemAlarm) => (itemAlarm.id !== alarm.id))

            return {
                lastUpdate: new Date(),
                data: newDataAlarm
            }
        },

    }
});

export const { newDataAlarms, newAlarm, updateAlarm, deleteAlarm } = alarmSlice.actions;
export default alarmSlice.reducer;

export const getAlarmsData = () => (dispatch: any) => {
    try {
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
            dispatch(newDataAlarms({ data }))
        }).catch(err => {
            console.error(err)
        });
    } catch (err) {
        console.error(err)
    }
};


export const setAlarmData = (alarmItem: alarmType) => (dispatch: any) => {
    try {
        console.log("setAlarmData ", { alarmItem })
        const collectionRef = collection(firestoreFB, "alarm");
        const docAlarm = doc(collectionRef, alarmItem.id)
        setDoc((docAlarm), {
            uid: alarmItem.uid,
            days: alarmItem.days,
            hour: alarmItem.hour,
            note: alarmItem.note,
        }).then(docRef => {
            dispatch(updateAlarm({
                alarm: {
                    ...alarmItem,
                    hour: new Date(alarmItem.hour.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }))
                }
            }))
        });
    } catch (err) {
        console.error(err)
    }
};
// addDoc


export const addAlarmData = (alarmItem: alarmType) => (dispatch: any) => {
    try {
        const collectionRef = collection(firestoreFB, "alarm");
        addDoc((collectionRef), {
            uid: alarmItem.uid,
            hour: alarmItem.hour,
            days: alarmItem.days,
            note: alarmItem.note,
        }).then(docRef => {
            dispatch(newAlarm({
                alarm: {
                    ...alarmItem,
                    id: docRef.id,
                    hour: new Date(alarmItem.hour.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' }))
                }
            }))
        });
    } catch (err) {
        console.error(err)
    }
};


export const deleteAlarmData = (alarmItem: alarmType) => (dispatch: any) => {
    try {
        alert(JSON.stringify({ alarmItem }))

        const collectionRef = collection(firestoreFB, "alarm");
        const docAlarm = doc(collectionRef, alarmItem.id)
        deleteDoc(docAlarm).then(docRef => {
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



