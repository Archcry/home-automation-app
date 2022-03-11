import EventRepeatSharpIcon from '@mui/icons-material/EventRepeatSharp';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { DeviceGroup, FixedTimeSchedule } from '../../pages/somfy/types';

export const FixedTimeScheduleCard = ({
  schedule: { command, timezone, time, deviceGroups, dow },
  sendCommand,
}: {
  schedule: FixedTimeSchedule;
  sendCommand: (deviceGroups: DeviceGroup[], command: string) => void;
}) => {
  const toTime = (time: string) => {
    const dateTime = DateTime.local({
      zone: timezone,
    });

    const [hour, minute] = time.split(':').map((item) => parseInt(item));

    return dateTime.set({ hour: hour, minute: minute }).toFormat('HH:mm');
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
              Will execute command "{command.name}" at {toTime(time)}.
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
