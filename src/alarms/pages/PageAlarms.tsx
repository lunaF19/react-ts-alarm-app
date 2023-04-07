
import { useState, useEffect, useMemo, useRef } from "react"

import { RootState } from "../../store/index"
import { useSelector, useDispatch } from "react-redux/es/exports"

import { getAlarmsData, alarmType, initDataAlarm, deleteAlarmData } from "../../store/features/alarmsSlice"
import { AlarmForm } from "../components"
import { daysList } from "../components/MultiSelectDays"

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

/* Card alarm */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import { Container } from "@mui/material"


export const PageAlarms = () => {
  const dispatch = useDispatch()
  const authStore = useSelector((store: RootState) => store.auth)
  const alarmsStore = useSelector((store: RootState) => store.alarms)

  const [alarmItem, setAlarmItem] = useState<alarmType>({} as alarmType)
  const refTimerDiv = useRef<HTMLElement>(null)
  const [openModalDialog, setOpenModalDialog] = useState<boolean>(false)

  const handleClickAdd = () => {
    if (authStore.user.uid) {
      setAlarmItem({ ...initDataAlarm, uid: authStore.user.uid })
      setOpenModalDialog(true);
    }
  };

  const handleClickEdit = (alarmItem: alarmType) => {
    setAlarmItem({ ...alarmItem })
    setOpenModalDialog(true);
  };

  const handleClickDelete = (alarmItem: alarmType) => {
    dispatch(deleteAlarmData(alarmItem))
  };


  useEffect(() => {
    dispatch(getAlarmsData())

    const idInterval = setInterval(() => {
      const dateNow = new Date()
      if (refTimerDiv.current) {
        const format = (prm: number) => prm < 10 ? `0${prm}` : prm
        refTimerDiv.current.innerHTML = `${format(dateNow.getHours())}:${format(dateNow.getMinutes())}:${format(dateNow.getSeconds())}`
      }
    }, 500)
    // console.log( {schedule})

    return () => {
      clearInterval(idInterval)
    }
  }, [])

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center" }
    }>
      <Container maxWidth="sm"> 

        <Card style={{ margin: "10px 0" }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="inherit" fontSize={"5em"} textAlign={"center"} ref={refTimerDiv} >
              </Typography>
              <Typography gutterBottom variant="inherit">
                The next alarms sounds in:
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button variant="soft" fullWidth onClick={handleClickAdd} size="large">
              Add new Alarm
              <AddCircleOutlineIcon />
            </Button>
          </CardActions>
        </Card>


        {
          alarmsStore.status === 1 && (
            <Box sx={{ display: 'flex' }}>
              <Container>
                {/* <CircularProgress /> */}
                {/* Getting alarms... */}
                <LinearProgress />
              </Container>
            </Box>
          )
        }



        <AlarmForm
          alarm={alarmItem}
          openModalDialog={openModalDialog}
          setOpenModalDialog={setOpenModalDialog}
        />

        {
          alarmsStore.data.map((alarmItem: alarmType) => {
            return (
              <ItemAlarmCard key={alarmItem.id} alarm={alarmItem} onClicEdit={handleClickEdit} onClickDelete={handleClickDelete} />
            )
          })
        }
      </Container>

    </Box>


  )
}


interface ItemAlarmCardProps {
  alarm: alarmType;
  onClicEdit: (alarm: alarmType) => void
  onClickDelete: (alarm: alarmType) => void
}

const ItemAlarmCard = (props: ItemAlarmCardProps) => {

  const { alarm, onClicEdit, onClickDelete } = props
  const { days, id, hour, note } = alarm


  const showDays = useMemo(() => {
    const daysFiltered = daysList.filter(item => days.includes(item.value))
    const text = new Intl.ListFormat("en", { type: "conjunction" }).format(daysFiltered.map(item => item.label))
    return (
      <>
        The alarms will sound {text}
      </>
    )

  }, [daysList, days])

  return (

    <Card style={{ margin: "10px 0" }}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {hour.toString().split(",")[1]}
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



