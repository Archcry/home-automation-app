import EventRepeatSharpIcon from '@mui/icons-material/EventRepeatSharp';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../components/auth/auth-context';
import { Layout } from '../../components/layout/layout';
import { FixedTimeScheduleTypography } from '../../components/shutter/fixed-time-schedule-typography';
import { SuncalcScheduleTypography } from '../../components/shutter/suncalc-schedule-typography';
import { DeviceGroup, Schedule } from './types';

export const Schedules = () => {
  const apiUrl = window._env_.SOMFY_API_URL;

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { username, password } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${apiUrl}/shutter/schedules`, {
        auth: {
          username: username ?? '',
          password: password ?? '',
        },
      })
      .then((response) => setSchedules(response.data));
  }, [apiUrl, username, password]);

  const sendCommand = (deviceGroups: DeviceGroup[], command: string) => {
    const devices = Array.from(new Set(deviceGroups.flatMap((dg) => dg.devices)));

    axios.post(
      `${apiUrl}/shutter/${command}`,
      {
        devices: devices.map((device) => device.uid),
      },
      {
        auth: {
          username: username ?? '',
          password: password ?? '',
        },
      }
    );
  };

  return (
    <Layout>
      <Grid container spacing={2} direction="row" alignItems="flex-start">
        {schedules.map((schedule) => (
          <Grid item lg={4} xs={12} key={schedule.uid}>
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
                    {schedule.command.name.charAt(0).toUpperCase() + schedule.command.name.slice(1)}
                  </Typography>
                  <Button variant="contained" onClick={() => sendCommand(schedule.deviceGroups, schedule.command.name)}>
                    Test
                  </Button>
                </Box>
                <Box>
                  {schedule.type === 'fixed_time' && <FixedTimeScheduleTypography schedule={schedule} />}
                  {schedule.type === 'suncalc' && <SuncalcScheduleTypography schedule={schedule} />}

                  <Grid container direction="row" spacing={1}>
                    {schedule.dow.map((day) => (
                      <Grid item key={day}>
                        <Chip size="small" icon={<EventRepeatSharpIcon />} label={day} />
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Grid container direction="row" spacing={1}>
                    {schedule.deviceGroups.map(({ uid, name }) => (
                      <Grid key={uid} item>
                        <Chip size="small" label={name} icon={<HomeIcon />} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
