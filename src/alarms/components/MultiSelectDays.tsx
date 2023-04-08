import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { InputLabel } from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



export const daysList = [
    { label: 'Sunday', value: 0 },
    { label: 'Monday', value: 1 },
    { label: 'Thuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
];

function getStyles(value: number, days: number[], theme: Theme) {
    return {
        fontWeight: days.includes(value) ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

interface MultiSelectDaysProps {
    selectedDays: number[]
    setSelectedDays: React.Dispatch<React.SetStateAction<number[]>>
}


export const MultiSelectDays = (props: MultiSelectDaysProps) => {
    const theme = useTheme();
    const { selectedDays, setSelectedDays } = props

    const handleChange = (event: SelectChangeEvent<typeof selectedDays>) => {
        const {
            target: { value },
        } = event;
        setSelectedDays(value as typeof selectedDays);
    };

    return (
        <>
            <InputLabel id="days-multiple-name-label">Select Days</InputLabel>
            <Select
                labelId="days-multiple-name-label"
                id="days-multiple-name"
                multiple
                value={selectedDays}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
            >
                {daysList.map((itemDay) => (
                    <MenuItem
                        key={`${itemDay.value}__${itemDay.label}`}
                        value={itemDay.value}
                        style={getStyles(itemDay.value, selectedDays, theme)}
                    >
                        {itemDay.label}
                    </MenuItem>
                ))}
            </Select>
        </>

    );
}