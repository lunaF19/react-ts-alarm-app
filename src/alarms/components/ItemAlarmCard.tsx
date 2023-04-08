
import { useMemo } from "react"

import { alarmType } from "../../store/features/alarmsSlice"

import { daysList, MultiSelectDays } from "../components/MultiSelectDays"


/* Card alarm */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Switch } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

interface ItemAlarmCardProps {
    alarm: alarmType;
    onClicEdit: (alarm: alarmType) => void
    onClickDelete: (alarm: alarmType) => void
    onClickActiveToggle: (alarm: alarmType) => void
}

export const ItemAlarmCard = (props: ItemAlarmCardProps) => {

    const { alarm, onClicEdit, onClickDelete, onClickActiveToggle } = props
    const { days, id, hour, note, active } = alarm


    const showDays = useMemo(() => {
        return (
            <MultiSelectDays selectedDays={alarm.days} isSmall={true} />
        )
    }, [daysList, days])

    return (

        <Card style={{ margin: "10px 0" }} className="animate__animated animate__fadeInDown">
            <CardActionArea onClick={() => onClicEdit(alarm)}>

                <CardContent sx={{ display: 'flex', flexWrap: 'wrap', alignItems: "center"}}>
                    <Typography gutterBottom variant="h3" component="div" style={{ display: "flex", alignItems: "center", width: "45%" }}>
                        {hour.toString().split(",")[1]}
                    </Typography>

                    <Typography gutterBottom variant="h3" component="div" style={{ display: "flex", alignItems: "center", width: "55%", justifyContent: "center" }}>
                        {showDays}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ position: "relative", }}>
                <Button size="small" color="primary" onClick={() => onClicEdit(alarm)}>
                    Edit
                </Button>
                <Button size="small" color="error" onClick={() => onClickDelete(alarm)}>
                    Delete
                </Button>
                <div style={{ position: "absolute", bottom: "0", right: "0", height: "100%", display: "flex", alignItems: "center", }}>
                    <Switch checked={active} color="primary" size="medium" onClick={() => onClickActiveToggle(alarm)} />
                </div>
            </CardActions>
        </Card>
    )
}

