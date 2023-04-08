
import { useMemo } from "react"

import { alarmType } from "../../store/features/alarmsSlice"

import { daysList } from "../components/MultiSelectDays"

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
        const daysFiltered = daysList.filter(item => days.includes(item.value))
        const text = new Intl.ListFormat("en", { type: "conjunction" }).format(daysFiltered.map(item => item.label))
        return (
            <>
                The alarms will sound {text}.
            </>
        )
    }, [daysList, days])

    return (

        <Card style={{ margin: "10px 0" }} className="animate__animated animate__fadeInDown">
            <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {hour.toString().split(",")[1]}

                        <div style={{ position: "absolute", top: "0", right: "0" }}>
                            <Switch checked={active}  color="primary" size="medium" onClick={() => onClickActiveToggle(alarm)} />
                        </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {showDays}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onClicEdit(alarm)}>
                    Edit
                </Button>
                <Button size="small" color="error" onClick={() => onClickDelete(alarm)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

