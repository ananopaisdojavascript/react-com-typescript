import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import apiService from '../services/apiService';
import { IEvent } from '../models/event';
import "../App.css";
import { ICalendar } from '../models/calendar';

const classes = {
  root: {
    height: "100%"
  },
  table: {
    borderTop: "1px solid rgb(224, 224, 224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)"
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px"
    }
  }
}

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

export default function CalendarPage() {
  const [events, setEvents] = useState<IEvent[]>([])
  const [calendars, setCalendars] = useState<ICalendar[]>([])
  const [selectedCalendar, setSelectedCalendar] = useState<boolean[]>([])
  const weeks = generateCalendar(getToday(), events, calendars, selectedCalendar)
  const firstDay = weeks[0][0].date;
  const lastDay = weeks[weeks.length - 1][6].date

  const brazilianTime = (time: string) => {
    return time.slice(0, 5)
  }

  const toggleCalendar = (i: number) => {
    const value = [...selectedCalendar]
    value[i] = !value[i]
    setSelectedCalendar(value)
  }

  useEffect(() => {
    Promise.all([apiService.getCalendars(), apiService.getEvents(firstDay, lastDay)]).then(
      ([calendars, events]) => {
        setSelectedCalendar(calendars.map(() => true))
        setCalendars(calendars);
        setEvents(events);
      }
    )
  }, [firstDay, lastDay])

  return (
    <Fragment>
      <Box display="flex" height="100%" alignItems="stretch">
        <Box borderRight="1px solid rgb(224, 224, 224)" width="12em" padding="8px 16px">
          <h2>Agenda React</h2>
          <Button variant="contained">Novo Evento</Button>

          <Box marginTop="64px">
            <h3>Agendas</h3>
            <FormGroup>
              {calendars.map((calendar, i) => (
                <FormControlLabel key={calendar.calendarId} control={<Checkbox checked={selectedCalendar[i]} onChange={() => toggleCalendar(i)} style={{ color: `${calendar.color}` }} />} label={calendar.name} />
              ))}
            </FormGroup>
          </Box>
        </Box>

        <Box flex="1" display='flex' flexDirection='column'>
          <Box display="flex" alignItems='center' padding="8px 16px">
            <Box flex="1">
              <IconButton aria-label='Seta para esquerda'>
                <ChevronLeftIcon />
              </IconButton>

              <IconButton aria-label='Seta para direita'>
                <ChevronRightIcon />
              </IconButton>

              <Box marginLeft='16px' component='strong'>Fevereiro de 2024</Box>

            </Box>
            <IconButton>
              <Avatar src="/broken-image.jpg" />
            </IconButton>
          </Box>

          <TableContainer style={{flex: "1"}} component={'div'}>
            <Table aria-label="simple table" sx={classes.table}>
              <TableHead>
                <TableRow>
                  {DAYS_OF_WEEK.map(day => <TableCell align='center' key={day}>{day}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {weeks.map((week, i) => (
                  <TableRow key={i}>
                    {week.map(cell => <TableCell align='center' key={cell.dayOfMonth}>
                      <div>{cell.dayOfMonth}</div>

                      {
                        cell.events.map((event) => {
                          const color = event.calendar.color;
                          return (
                            <button key={event.calendarId} className='event'>
                              {event.time &&
                                (<Fragment>
                                  <span>
                                    <WatchLaterIcon style={{ color }} fontSize='inherit' />
                                  </span>
                                  <Box component="span" margin="0 4px">{brazilianTime(event.time)}</Box>
                                </Fragment>)}
                              {event.time ? <span style={{ backgroundColor: `${color}`, color: "#fff", padding: "3px" }}>{event.description}</span> : <div>{event.description}</div>}
                            </button>
                          )
                        })
                      }
                    </TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Fragment>
  )
}

type CalendarAndEvents = IEvent & { calendar: ICalendar }

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: CalendarAndEvents[];
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  selectedCalendar: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T12:00:00")
  const currentDay = new Date(jsDate.valueOf())
  const currentMonth = jsDate.getMonth();
  currentDay.setDate(1)
  const dayOfWeek = currentDay.getDay()
  currentDay.setDate(1 - dayOfWeek)

  do {
    const week: ICalendarCell[] = []
    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0")
      const dayStr = (currentDay.getDate()).toString().padStart(2, "0")
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`

      const events: CalendarAndEvents[] = [];
      for (let event of allEvents) {
        if (event.date === isoDate) {
          const calendarIndex = calendars.findIndex(cal => cal.calendarId === event.calendarId)!
          if (selectedCalendar[calendarIndex]) {
            events.push({ ...event, calendar: calendars[calendarIndex] })
          }
        }
      }

      week.push({
        dayOfMonth: currentDay.getDate(),
        date: isoDate,
        events
      })
      currentDay.setDate(currentDay.getDate() + 1)
    }
    weeks.push(week)

  } while (currentDay.getMonth() === currentMonth)

  return weeks;
}

function getToday() {
  return "2024-02-23"
}