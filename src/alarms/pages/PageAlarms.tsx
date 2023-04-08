
import { useState, useEffect, useRef, useMemo, useCallback } from "react"

import { RootState } from "../../store/index"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getAlarmsData, alarmType, initDataAlarm, deleteAlarmData, setActiveAlarm } from "../../store/features/alarmsSlice"
import { AlarmForm, DeleteAlarmConfirmation, ItemAlarmCard, ItemAlarmSoundCard } from "../components"

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

  const dispatch = useAppDispatch()
  const authStore = useAppSelector((store: RootState) => store.auth)
  const alarmsStore = useAppSelector((store: RootState) => store.alarms)

  const refTimerDiv = useRef<HTMLElement>(null)

  const [alarmItem, setAlarmItem] = useState<alarmType>({} as alarmType)
  const [openModalDialog, setOpenModalDialog] = useState<boolean>(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false)

  const [alarmsSoud, setAlarmsSound] = useState<Array<alarmType>>([])

  const handleClickAdd = () => {
    if (authStore.user.uid) {
      setAlarmItem({ ...initDataAlarm, uid: authStore.user.uid })
      setOpenModalDialog(true);
    }
  };

  const handleClickEdit = useCallback((_alarmItem: alarmType) => {
    setAlarmItem({ ..._alarmItem })
    setOpenModalDialog(true);
  }, []);

  const handleClickDelete = useCallback((_alarmItem: alarmType) => {
    setAlarmItem(_alarmItem)
    setOpenDeleteConfirmation(true)
  }, []);

  const handleDeleteAlarm = useCallback(() => {
    dispatch(deleteAlarmData(alarmItem))
  }, [alarmItem]);


  const onClickActiveToggle = useCallback((_alarmItem: alarmType) => {
    dispatch(setActiveAlarm(_alarmItem))
  }, []);


  const onClickDemiss = useCallback((alarmItem: alarmType) => {
    setAlarmsSound(prev => {
      return prev.filter(item => item.id !== alarmItem.id)
    })
  }, []);



  const alarmsData = useMemo(() => {
    if (alarmsSoud.length === 0) {
      return [...alarmsStore.data]
    } else {
      const idAlarmsSoud = alarmsSoud.map(item => item.id);

      return [...alarmsStore.data].filter(item => !idAlarmsSoud.includes(item.id))

    }
  }, [alarmsStore.data, alarmsSoud])


  useEffect(() => {
    if (authStore.user.uid) dispatch(getAlarmsData(authStore.user.uid))
    const idInterval = setInterval(() => {
      const dateNow = new Date()
      if (refTimerDiv.current) {
        const format = (prm: number) => prm < 10 ? `0${prm}` : prm
        refTimerDiv.current.innerHTML = `${format(dateNow.getHours())}:${format(dateNow.getMinutes())}:${format(dateNow.getSeconds())}`
      }
    }, 500)

    return () => {
      clearInterval(idInterval)
    }
  }, [])

  useEffect(() => {

    const arrIdTimeOut: any[] = []
    const dataAlarms = [...alarmsStore.data]

    dataAlarms.forEach((itemAlarm: alarmType) => {
      const dateNow = new Date();
      const today = dateNow.getDay()

      if (itemAlarm.days.includes(today) && itemAlarm.active) { // La alarma sonará hoy
        const dateOfAlarm = new Date(itemAlarm.hour)
        const dateOfAlarmToday = new Date()
        dateOfAlarmToday.setHours(dateOfAlarm.getHours())
        dateOfAlarmToday.setMinutes(dateOfAlarm.getMinutes())
        dateOfAlarmToday.setSeconds(0)
        const secoundsLeft = dateOfAlarmToday.getTime() - dateNow.getTime() //dateOfAlarm.setDate(dateNow.getDate()) - dateNow.getTime()

        if (secoundsLeft > 0) { // aún no ha sonado
          const idTimeOut = setTimeout(() => {
            setAlarmsSound(prev => {
              const filteredState = prev.filter(item => item.id !== itemAlarm.id)
              return [...filteredState, { ...itemAlarm }]
            })
          }, secoundsLeft)
          arrIdTimeOut.push({ secoundsLeft, idTimeOut, itemAlarm })
        }
      }
    })

    return () => {
      arrIdTimeOut.forEach((item) => {
        clearTimeout(item.idTimeOut)
      })
    }
  }, [alarmsStore.data])



  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center" }}>

      <Container fixed>
        {
          alarmsSoud.map((alarmItem: alarmType) => {
            return (
              <ItemAlarmSoundCard key={`${alarmItem.id}__sound`} alarm={alarmItem} onClickDemiss={onClickDemiss} />
            )
          })
        }

      </Container>
      {/* <div style={{ position: "fixed", top: "0", left: "0", right: "0" }}>
        asda
        sdasdasdasd
      </div> */}

      {/* Form Edit or Add alarm*/}
      <AlarmForm
        alarm={alarmItem}
        openModalDialog={openModalDialog}
        setOpenModalDialog={setOpenModalDialog}
      />

      {/* Confirmation Delete Promp */}
      <DeleteAlarmConfirmation
        openDeleteConfirmation={openDeleteConfirmation}
        setOpenDeleteConfirmation={setOpenDeleteConfirmation}
        handleDeleteAlarm={handleDeleteAlarm}

      />

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
            <Button fullWidth onClick={handleClickAdd} size="large">
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

        {
          alarmsData.map((alarmItem: alarmType) => {
            return (
              <ItemAlarmCard key={alarmItem.id} alarm={alarmItem} onClickActiveToggle={onClickActiveToggle} onClicEdit={handleClickEdit} onClickDelete={handleClickDelete} />
            )
          })
        }
      </Container>

    </Box>


  )
}


