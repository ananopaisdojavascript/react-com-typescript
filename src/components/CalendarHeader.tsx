import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';
import date from "../date";

interface ICalendarHeaderProps {
  month: string,
}

export default function CalendarHeader(props: ICalendarHeaderProps) {
  const { month } = props
  return (
    <Box display="flex" alignItems='center' padding="8px 16px">
      <Box flex="1">
        <IconButton aria-label='Seta para esquerda' href={`/calendar/${date.addMonths(month, - 1)}`}>
          <ChevronLeftIcon />
        </IconButton>

        <IconButton aria-label='Seta para direita' href={`/calendar/${date.addMonths(month, 1)}`}>
          <ChevronRightIcon />
        </IconButton>

        <Box marginLeft='16px' component='strong'>{date.formatMonth(month)}</Box>

      </Box>
      <IconButton>
        <Avatar src="/broken-image.jpg" />
      </IconButton>
    </Box>
  )
}
