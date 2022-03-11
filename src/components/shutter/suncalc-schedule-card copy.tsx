import EventRepeatSharpIcon from '@mui/icons-material/EventRepeatSharp';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import sunCalc from 'suncalc';
import { DeviceGroup, SunCalcKind, SunCalcSchedule } from '../../pages/somfy/types';

export const SunCalcScheduleCard = ({
  schedule: { command, deviceGroups, dow, coordinates, kind },
  sendCommand,
}: {
  schedule: SunCalcSchedule;
  sendCommand: (devices: DeviceGroup[], command: string) => void;
}) => {
  const toSunCalcTime = (kind: SunCalcKind) => {
    const suncalcTime = sunCalc.getTimes(new Date(), coordinates.latitude, coordinates.longitude)[kind];

    if (suncalcTime) {
      return DateTime.fromJSDate(suncalcTime).toFormat('HH:mm');
    }

    return 'unknown';
  };

  return (
    <Grid item lg={4} xs={12}>
      <Card>
        <CardContent>
          <Box
            sx={{
              width: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography component="div" variant="h5">
              {command.name}
            </Typography>
            <Button variant="contained" onClick={() => sendCommand(deviceGroups, command.name)}>
              Test
            </Button>
          </Box>
          <Box>
            <Typography component="p" sx={{ mt: 2 }}>
              Will execute command "{command.name}" at {kind} ({toSunCalcTime(kind)}).
            </Typography>
            <Stack direction="row" sx={{ mt: 1, flexWrap: 'wrap' }}>
              {dow.map((day) => (
                <Chip sx={{ mt: 1, mr: 0.5 }} size="small" icon={<EventRepeatSharpIcon />} label={day} />
              ))}
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {deviceGroups.map(({ name }) => (
                <Chip label={name}></Chip>
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
