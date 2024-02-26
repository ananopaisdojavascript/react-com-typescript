import { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import apiService from '../services/apiService';
import { IEvent } from '../models/event';
import "../App.css";
import { ICalendar } from '../models/calendar';
import CalendarView from './CalendarView';
import CalendarHeader from './CalendarHeader';
import { useParams } from 'react-router-dom';
import Calendar from './Calendar';
import { CalendarAndEvents, ICalendarCell } from '../calendarEvent';

export default function CalendarPage() {
    let { month } = useParams<{ month: string }>()
    const [events, setEvents] = useState<IEvent[]>([])
    const [calendars, setCalendars] = useState<ICalendar[]>([])
    const [selectedCalendar, setSelectedCalendar] = useState<boolean[]>([])
    const weeks = generateCalendar(`${month}-01`, events, calendars, selectedCalendar)
    const firstDay = weeks[0][0].date;
    const lastDay = weeks[weeks.length - 1][6].date

  

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

          <CalendarView calendars={calendars} toggleCalendar={toggleCalendar} selectedCalendar={selectedCalendar} />
        </Box>

        <Box flex="1" display='flex' flexDirection='column'>
          <CalendarHeader month={month}/>

          <Calendar weeks={weeks}/>
        </Box>
      </Box>
    </Fragment>
  )
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
    for (let i = 0; i < 7; i++) {
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