import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import * as sunCalc from 'suncalc';
import { SunCalcKind, SunCalcSchedule } from '../../pages/somfy/types';

export interface SuncalcScheduleTypographyProps {
  schedule: Pick<SunCalcSchedule, 'coordinates' | 'command' | 'kind'>;
}

export const SuncalcScheduleTypography = ({
  schedule: { command, kind, coordinates },
}: SuncalcScheduleTypographyProps) => {
  const toSunCalcTime = (kind: SunCalcKind) => {
    const suncalcTime = sunCalc.getTimes(new Date(), coordinates.latitude, coordinates.longitude)[kind];

    if (suncalcTime) {
      return DateTime.fromJSDate(suncalcTime).toFormat('HH:mm');
    }

    return 'unknown';
  };

  return (
    <Typography component="p" sx={{ mt: 2, mb: 2 }}>
      Will execute command "{command.name}" at {kind} ({toSunCalcTime(kind)}).
    </Typography>
  );
};
