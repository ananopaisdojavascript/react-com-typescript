import { Fragment } from 'react';
import { ICalendar } from '../models/calendar';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ICalendarViewProps {
  calendars: ICalendar[],
  toggleCalendar: (i: number) => void,
  selectedCalendar: boolean[]
}

export default function CalendarView(props: ICalendarViewProps) {
  const { calendars, selectedCalendar, toggleCalendar } = props;
  return (
    <Fragment>
      <Box marginTop="64px">
        <h3>Agendas</h3>
        <FormGroup>
          {calendars.map((calendar, i) => (
            <FormControlLabel 
            key={calendar.calendarId} 
            control={<Checkbox checked={selectedCalendar[i]} onChange={() => toggleCalendar(i)} style={{ color: `${calendar.color}` }} />} label={calendar.name} />
          ))}
        </FormGroup>
      </Box>
    </Fragment>
  )
}