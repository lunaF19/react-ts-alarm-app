
import { useMemo } from "react"

import { alarmType } from "../../store/features/alarmsSlice"

import { daysList } from "./MultiSelectDays"

/* Card alarm */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

interface ItemAlarmSoundCardProps {
    alarm: alarmType;
    onClickDemiss: (alarm: alarmType) => void
}

export const ItemAlarmSoundCard = (props: ItemAlarmSoundCardProps) => {

    const { alarm, onClickDemiss } = props
    const { days, id, hour, note } = alarm

    const showDays = useMemo(() => {
        const dateNow = new Date();
        const itemDayOfList = daysList.find(item => item.value === dateNow.getDay())
        return <> {itemDayOfList?.label}</>

    }, [daysList, days])

    return (

        <Card style={{ margin: "10px 0" }} className="animate__animated animate__backInDown">
            
            <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {showDays} - {hour.toString().split(",")[1]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {note}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onClickDemiss(alarm)}>
                    Demiss
                </Button>
            </CardActions>
        </Card>
    )
}

