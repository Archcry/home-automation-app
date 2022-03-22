import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FixedTimeSchedule } from '../../pages/somfy/types';

export interface FixedTimeScheduleTypographyProps {
  schedule: Pick<FixedTimeSchedule, 'time' | 'timezone' | 'command'>;
}

export const FixedTimeScheduleTypography = ({
  schedule: { time, timezone, command },
}: FixedTimeScheduleTypographyProps) => {
  const toTime = (time: string) => {
    const dateTime = DateTime.local({
      zone: timezone,
    });

    const [hour, minute] = time.split(':').map((item) => parseInt(item));

    return dateTime.set({ hour: hour, minute: minute }).toLocal().toFormat('HH:mm');
  };

  return (
    <Typography component="p" sx={{ mt: 2, mb: 2 }}>
      Will execute command "{command.name}" at {toTime(time)}.
    </Typography>
  );
};
