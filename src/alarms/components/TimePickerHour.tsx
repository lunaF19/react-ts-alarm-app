import { FormControl } from "@mui/material"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';

interface TimePickerHourProps {
    selectedTime: Date | null
    setSelectedTime: React.Dispatch<React.SetStateAction<Date | null>>
}

export const TimePickerHour = (props: TimePickerHourProps) => {
    const { selectedTime, setSelectedTime } = props
    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}  >
            <TimePicker
                label="Enter hour"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
            />
            {/* {JSON.stringify({ selectedTime })}
                <div>Selected Time: {selectedTime && selectedTime?.toLocaleTimeString()}</div> */}
        </LocalizationProvider>

    )
}