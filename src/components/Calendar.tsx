import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Fragment } from "react";
import Box from "@mui/material/Box";
import { ICalendarCell } from "../calendarEvent";

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

interface ICalendarProps {
  weeks: ICalendarCell[][]
}

export default function Calendar(props: ICalendarProps) {
  const { weeks } = props;
  const brazilianTime = (time: string) => {
    return time.slice(0, 5)
  }
  return (
    <TableContainer style={{ flex: "1" }} component={'div'}>
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
  )
}
