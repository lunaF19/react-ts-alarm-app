
import { useEffect } from "react"
import { useSelector } from "react-redux/es/exports"
import { RootState } from "../../store/index"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface DeleteAlarmConfirmationProps {
    openDeleteConfirmation: boolean;
    setOpenDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteAlarm: () => void
}

export const DeleteAlarmConfirmation = (props: DeleteAlarmConfirmationProps) => {
    const { openDeleteConfirmation, setOpenDeleteConfirmation, handleDeleteAlarm } = props

    const { status } = useSelector((store: RootState) => store.alarms)


    const handleClose = () => {
        setOpenDeleteConfirmation(false);
    };


    useEffect(() => {
        if (status === 3) {
            setOpenDeleteConfirmation(false)
        }
    }, [status])



    return (
        <div>
            <Dialog
                open={openDeleteConfirmation}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="animate__animated animate__fadeIn animate__faster"
                
            >
                <div >

                <DialogTitle id="alert-dialog-title">
                    You can delete this alarm?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Remember what you in any time have a possibility disabled this alarm
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeleteAlarm} autoFocus color="error">
                        Delete
                        {status === 2 && <CircularProgress />}
                        {status === 3 && <CheckCircleIcon />}
                        {status === -1 && <ErrorOutlineIcon />}
                    </Button>
                </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}