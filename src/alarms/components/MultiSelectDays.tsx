import { Theme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';

export const daysList = [
    { label: 'Sunday', value: 0 },
    { label: 'Monday', value: 1 },
    { label: 'Thuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
];


export const daysList2 = [
    { label: 'D', value: 0 },
    { label: 'L', value: 1 },
    { label: 'M', value: 2 },
    { label: 'X', value: 3 },
    { label: 'J', value: 4 },
    { label: 'V', value: 5 },
    { label: 'S', value: 6 },
];

interface MultiSelectDaysProps {
    selectedDays: number[]
    setSelectedDays?: React.Dispatch<React.SetStateAction<number[]>>
    isSmall?: boolean;
}


export const MultiSelectDays = (props: MultiSelectDaysProps) => {
    const { selectedDays, setSelectedDays, isSmall } = props

    const onClickBtnDay = (day: number) => {
        if (setSelectedDays) {
            if (selectedDays.includes(day)) {
                setSelectedDays(prev => prev.filter(item => item !== day))
            } else {
                setSelectedDays(prev => [...prev, day])
            }
        }
    }

    return (
        <>
            <Stack direction="row" spacing={1} justifyContent={"center"} >
                {
                    daysList2.map(({ value, label }) => {
                        return (
                            <ButtonDay
                                key={`${value}__${label}`}
                                isSmall={isSmall}
                                label={label}
                                day={value}
                                isSelected={selectedDays.includes(value)}
                                onClick={onClickBtnDay}
                            />
                        )
                    })
                }
            </Stack >
        </>

    );
}


interface ButtonDayProps {
    isSelected: boolean,
    label: string
    day: number,
    isSmall?: boolean
    onClick: (prm: number) => void
}


const ButtonDay = (props: ButtonDayProps) => {
    const { isSelected, onClick, day, label, isSmall } = props

    return (
        <Chip
            size={isSmall ? "small" : "medium"}
            color="primary"
            label={label}
            onClick={() => onClick(day)}
            variant={isSelected ? "filled" : "outlined"}
        />
    )
}