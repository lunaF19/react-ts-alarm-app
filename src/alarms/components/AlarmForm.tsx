import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { alarmType, setAlarmData, addAlarmData } from '../../store/features/alarmsSlice';

import { RootState } from "../../store/index"


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { MultiSelectDays, TimePickerHour } from "./"

import notify from "../../UI/utils/notify"


interface AlarmFormProps {
    alarm: alarmType;
    openModalDialog: boolean;
    setOpenModalDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const AlarmForm = (props: AlarmFormProps) => {
    const dispatch = useDispatch()
    const { status } = useSelector((store: RootState) => store.alarms)

    const { alarm, openModalDialog, setOpenModalDialog } = props

    const [isInsert, setIsInsert] = useState<boolean>(false)

    const [selectedDays, setSelectedDays] = React.useState<number[]>(alarm.days || []);
    const refBtnSubmit = useRef(null)

    const [selectedTime, setSelectedTime] = useState<Date | null>(new Date(alarm.hour));

    const [noteText, setNoteText] = useState<string>(alarm.note || "")

    const {
        handleSubmit
    } = useForm({})

    const onSubmit = async (data: any) => {
        if (!selectedTime) {
            return notify.error("alarm time is missing")
        }

        if (selectedDays.length <= 0) {
            return notify.error("must have at least one day selected")
        }

        const itemAlarm: alarmType = {
            id: alarm.id,
            uid: alarm.uid,
            hour: selectedTime.toString(),
            days: selectedDays,
            note: noteText,
            active: Boolean(alarm.active)
        }
        if (isInsert) {
            dispatch(addAlarmData(itemAlarm))
            setIsInsert(false)
        } else {
            dispatch(setAlarmData(itemAlarm))
        }

    }

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpenModalDialog(false);
        }
    };

    useEffect(() => {
        if (openModalDialog) {
            setIsInsert(!Boolean(alarm.id))
            setSelectedDays(alarm.days)
            setSelectedTime(new Date(alarm.hour))
            if (alarm.note) setNoteText(alarm.note)
            else setNoteText("")
        }
    }, [openModalDialog])

    useEffect(() => {
        if (status === 3) {
            setOpenModalDialog(false)
        }
    }, [status])


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Dialog disableEscapeKeyDown open={openModalDialog} onClose={handleClose}>
                <DialogTitle>Create new alarm</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>

                        <FormControl sx={{ m: 1, width: "100%" }}>
                            <TimePickerHour
                                selectedTime={selectedTime}
                                setSelectedTime={setSelectedTime} />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "100%" }}>
                            <MultiSelectDays
                                selectedDays={selectedDays}
                                setSelectedDays={setSelectedDays} />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: "100%" }}>
                            <TextField
                                id="filled-multiline-static"
                                label="Note of alarm"
                                multiline
                                rows={4}
                                variant="filled"
                                value={noteText}
                                onChange={(e) => { setNoteText(e.target.value) }}
                            />
                        </FormControl>
                        <Button ref={refBtnSubmit} fullWidth type="submit" style={{ display: "none" }}>
                            {isInsert ? "Inser " : "Save"}
                        </Button>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={status === 2} >
                        Cancel
                    </Button>
                    <Button onClick={() => refBtnSubmit.current.click()} disabled={status === 2}>
                        Ok
                        {status === 2 && <CircularProgress />}
                        {status === 3 && <CheckCircleIcon />}
                        {status === -1 && <ErrorOutlineIcon />}
                    </Button>
                </DialogActions>
            </Dialog>


        </form>
    );
}












